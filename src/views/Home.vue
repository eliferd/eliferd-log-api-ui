<template>
  <div class="home">
    <h1>Bienvenue, {{ fullname | capitalize }}</h1>
    <p>Cliquez sur un des boutons ci-dessous pour choisir l’application à observer.</p>
    <div class="button-list">
      <EliButton v-for="element of logsList"
                 :key="element.id"
                 :label="element.label"
                 v-on:click.native="navigateToAppLogPage($event, element.id)"
                 class="app-btn"/>
    </div>
    <DisconnectButton small="true"/>
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
import { Component, Vue } from 'vue-property-decorator';
import EliButton from '@/components/EliButton.vue';
import DisconnectButton from '@/components/shared/DisconnectButton.vue';
import { LogProvider } from '@/modules/auth';

@Component({
  components: {
    EliButton,
    DisconnectButton
  }
})
export default class Home extends Vue {
  logsList: {label: string; id: string}[] = [];

  fullname = this.$store.getters.StateUser.username;

  navigateToAppLogPage (event: MouseEvent, logAppId: string) {
    this.$router.push('/app/' + logAppId);
  }

  async created() {
    document.title = this.$route.meta.title;

    if (this.$store.getters.StateUser) {
      await this.$store.dispatch('getProviders');
      // eslint-disable-next-line no-unused-expressions
      await this.$store.getters.StateProviders?.forEach(
        (provider: LogProvider) => this.logsList.push({ label: this.$options.filters?.capitalize(provider.str_provider_name), id: provider.str_provider_name }));
    }
  }
}
</script>
