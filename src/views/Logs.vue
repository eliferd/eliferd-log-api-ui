<template>
    <div>
      <Loading/>

      <h1>Logs de {{ appName | capitalize}}</h1>

      <section class="filters-container">
        <article>
            <span>Filtrer par :</span>
        </article>

        <article>
          <span v-for="filter of appLogsLevelsList" :key="filter.id_log_level">
            <label :class="bindLevelsColors(filter)">
              <input :value="filter.id_log_level" type="checkbox" v-model="filters">
              {{ filter.str_name }}
            </label>
          </span>
        </article>
      </section>

      <br>

      <p v-if="displayedAppLogsList && displayedAppLogsList.length === 0">
        Aucun résultat.
      </p>

      <section v-if="displayedAppLogsList && displayedAppLogsList.length > 0" class="logs-list-container">
        <table>
          <tr v-for="appLog of displayedAppLogsList" :key="appLog.id_log" class="log-row">
            <td align="center" class="log-details-col">
              {{ new Date(appLog.print_date) | parseDate }} <br>
              <span class="level-popup" :class="bindLevelsColors(getLevelById(appLog.id_log_level), true)">
                {{ appLog.str_level }}
              </span>
            </td>
            <td class="log-msg-col">
              <pre>{{ appLog.str_message }}</pre>
            </td>
          </tr>
        </table>
      </section>

      <section class="bottom-btns">
        <table >
          <tr>
            <th colspan="2" align="left">
              <EliButton label="Revenir à la liste des applications"
                         icon="arrow-alt-circle-left"
                         v-on:click.native="$router.push('/')"
                         small="true"/>

              <EliButton label="Raffraichir les logs"
                         icon="sync-alt"
                         v-on:click.native="refreshList()"
                         small="true"/>
            </th>
            <th align="right">
              <DisconnectButton small="true"/>
            </th>
          </tr>
        </table>
      </section>
    </div>
</template>

<style scoped>
h1 {
  margin-left: 0.67rem;
  margin-right: 0.67rem;
  font-weight: normal;
}
.filters-container {
  display: flex;
  justify-content: flex-end;
}
.filters-container>section {
  margin-right: 12px;
}
section {
  display: inline-block;
}

label {
  margin-right: 6px;
  font-weight: bold;
}

p {
  text-align: center;
}

.logs-list-container {
  height: 70vh;
  box-shadow: 0 30px 72px #0000001e;
  overflow-y: scroll;
  border-radius: 10px;
  padding: 8px 18px;
  margin: 0 12px;
}

table {
  width: 100%;
  height: 100%;
  border-collapse: separate;
  border-spacing: 2px 15px;
}
.bottom-btns {
  display: block;
  margin: 0 12px;
}
.bottom-btns th:first-child>button {
  margin-right: 24px;
}
.log-row {
  background-color: #F4F4F4;
  background-size: 100%;
  box-shadow: 2px 2px 0px #00000050;
  border-radius: 10px;
  overflow-y: scroll;
}
.log-details-col {
  padding: 24px;
  border-radius: 10px 0 0 10px;
}
.log-msg-col {
  padding: 0 24px;
  border-radius: 0 10px 10px 0;
  overflow-y: scroll;
  width: 100%;
}

.info {
  color: #45A0F3;
}
.warning {
  color: #F39945;
}
.severe {
  color: #F34545;
}

.level-popup {
  border-radius: 13px;
  padding: 4px;
  font-size: 0.8rem;
}

.bgInfo {
  background-color: #45A0F3;
  color: white;
}
.bgWarning {
  background-color: #F39945;
  color: white;
}
.bgSevere {
  background-color: #F34545;
  color: white;
}
</style>

<script lang="ts">
import { LogEntity, LogLevels, LogProvider } from '@/modules/auth';
import { Component, Vue, Watch } from 'vue-property-decorator';
import EliButton from '@/components/EliButton.vue';
import DisconnectButton from '@/components/shared/DisconnectButton.vue';
import Loading from '@/components/shared/Loading.vue';

@Component({
  components: {
    EliButton,
    DisconnectButton,
    Loading
  }
})
export default class Logs extends Vue {
    appName = '';
    appLogsList: LogEntity[] = [];
    displayedAppLogsList: LogEntity[] = [];
    appLogsLevelsList: LogLevels[] = [];
    filters = [];

    mounted () {
      const { StateProviders } = this.$store.getters;

      if (!StateProviders.some((p: LogProvider) => p.str_provider_name === this.$route.params.appId)) {
        this.$router.push('/');
      }
      Promise.all([
        this.$store.dispatch('getLevels'),
        this.$store.dispatch('getProviders'),
        this.$store.dispatch('getAppLogs', this.$route.params.appId)
      ]).then(async () => {
        const { StateLogLevels, StateLogs } = await this.$store.getters;
        const formattedAppName = this.$options.filters?.capitalize(StateProviders.find((p: LogProvider) => p.str_provider_name === this.$route.params.appId).str_provider_name);
        this.appName = formattedAppName;
        this.appLogsList = StateLogs;
        this.displayedAppLogsList = StateLogs;
        this.appLogsLevelsList = StateLogLevels;
        document.title = this.$route.meta.title + ' de ' + this.appName;
      }).catch(e => console.log(e));
    }

    @Watch('filters')
    filtersChanged(filterList: number[]) {
      this.displayedAppLogsList = this.appLogsList.filter((logListElement: LogEntity) =>
        filterList.length > 0 ? filterList.includes(logListElement.id_log_level) : true)
    }

    refreshList() {
      this.$store.dispatch('getAppLogs', this.$route.params.appId).then(() => {
        const { StateLogs } = this.$store.getters;
        this.appLogsList = StateLogs;
        this.displayedAppLogsList = StateLogs;
        this.filtersChanged(this.filters);
      }).catch(e => console.log(e));
    }

    getLevelById(levelId: number): LogLevels | null {
      return this.appLogsLevelsList.find(l => l.id_log_level === levelId) ?? null;
    }

    bindLevelsColors(level: LogLevels, background = false) {
      const textColorsClasses = {
        info: level.id_log_level === 2,
        warning: level.id_log_level === 3,
        severe: level.id_log_level === 4
      }

      const backgroundColorsClasses = {
        bgInfo: level.id_log_level === 2,
        bgWarning: level.id_log_level === 3,
        bgSevere: level.id_log_level === 4
      }
      return !background ? textColorsClasses : backgroundColorsClasses;
    }
}
</script>
