<template>
    <div>
      <h1>Logs de {{ appName | capitalize}}</h1>

      <div v-if="isLoading" v-bind:class="{ loading: isLoading }">
        <span>Chargement...</span>
      </div>

      <section class="filters-container">

        <article>
            <span>Filtrer par :</span>
        </article>

        <article>
          <span v-for="filter of appLogsLevelsList" :key="filter.id_log_level">
            <label :class="bindLevelsColors(filter)">
              <input :id="'filter_' + filter.id_log_level" type="checkbox" name="filters">
              {{ filter.str_name }}
            </label>
          </span>
        </article>

      </section>

      <section class="logs-list-container">

        <table>

          <tr v-for="appLog of appLogsList" :key="appLog.id_log">
            <td>
              {{ new Date(appLog.print_date) | parseDate }} <br>
              <span class="level-popup" :class="bindLevelsColors(getLevelById(appLog.id_log_level), true)">
                {{ getLevelById(appLog.id_log_level).str_name }}
              </span>
            </td>
            <td>
              {{ appLog.str_message }}
            </td>
          </tr>

          <tr>
              <th colspan="2">
                <EliButton label="Revenir à la liste des applications"
                           v-on:click.native="$router.push('/')"/>
                <EliButton label="Raffraichir les logs"/>
              </th>
              <th>
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

.loading {
  background-color: rgba(255, 255, 255, 0.705);
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.loading>span {
  margin: auto;
}
</style>

<script lang="ts">
import { LogEntity, LogLevels, LogProvider } from '@/modules/auth';
import { Component, Vue } from 'vue-property-decorator';
import EliButton from '@/components/EliButton.vue';
import DisconnectButton from '@/components/shared/DisconnectButton.vue';

@Component({
  components: {
    EliButton,
    DisconnectButton
  }
})
export default class Logs extends Vue {
    appName = '';
    appLogsList: LogEntity[] = [];
    appLogsLevelsList: LogLevels[] = [];

    created () {
      const { StateProviders, StateLogLevels, StateLogs } = this.$store.getters;

      if (!StateProviders.some((p: LogProvider) => p.str_provider_name === this.$route.params.appId)) {
        this.$router.push('/');
      }
      Promise.all([
        this.$store.dispatch('getLevels'),
        this.$store.dispatch('getProviders'),
        this.$store.dispatch('getAppLogs', this.$route.params.appId)
      ]).then(() => {
        const formattedAppName =
              StateProviders.find((p: LogProvider) => p.str_provider_name === this.$route.params.appId).str_provider_name.charAt(0).toUpperCase() +
              StateProviders.find((p: LogProvider) => p.str_provider_name === this.$route.params.appId).str_provider_name.slice(1);
        this.appName = formattedAppName;
        this.appLogsList = StateLogs;
        this.appLogsLevelsList = StateLogLevels;
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

    get isLoading() {
      return this.$store.getters.isLoading;
    }
}
</script>
