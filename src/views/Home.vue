<template>
  <div class="home">
    <h1>Bienvenue, {{ fullname }}</h1>
    <p>Cliquez sur un des boutons ci-dessous pour choisir l’application à observer.</p>
    <div class="button-list">
      <EliButton v-for="element of logsList"
                 :key="element.id"
                 :label="element.label"
                 v-on:click.native="navigateToAppLogPage($event, element.id)"
                 class="app-btn"/>
    </div>
    <EliButton label="Déconnexion" variant="red" v-on:click.native="logout()"/>
  </div>
</template>
<style scoped>
.home {
  margin: 15vh auto;
}
h1 {
  font-weight: normal;
  text-align: center;
}
p {
  text-align: center;
}
.button-list {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 50px auto;
}
.app-btn {
  margin-bottom: 20px;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EliButton from '@/components/EliButton.vue'
import { LogProvider } from '@/modules/auth';

@Component({
  components: {
    EliButton
  }
})
export default class Home extends Vue {
  logsList: {label: string; id: string}[] = [];

  fullname = this.$store.getters.StateUser.username.charAt(0).toUpperCase() + this.$store.getters.StateUser.username.slice(1);

  navigateToAppLogPage (event: MouseEvent, logAppId: string) {
    this.$router.push('/app/' + logAppId);
  }

  async created() {
    if (this.$store.getters.StateUser) {
      await this.$store.dispatch('getProviders');
      // eslint-disable-next-line no-unused-expressions
      await this.$store.getters.StateProviders?.forEach(
        (provider: LogProvider) => this.logsList.push({ label: provider.str_provider_name.charAt(0).toUpperCase() + provider.str_provider_name.slice(1), id: provider.str_provider_name }));
    }
  }

  async logout () {
    await this.$store.dispatch('logout');
    this.$router.push('/login');
  }
}
</script>
