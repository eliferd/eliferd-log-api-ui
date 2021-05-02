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

@Component({
  components: {
    EliButton
  }
})
export default class Home extends Vue {
  logsList = [
    { label: 'App 1', id: 'app1' },
    { label: 'App 2', id: 'app2' },
    { label: 'App 3', id: 'app3' },
    { label: 'App 4', id: 'app4' },
    { label: 'App 5', id: 'app5' }
  ];

  fullname = 'John Doe';

  navigateToAppLogPage (event: MouseEvent, test: string) {
    console.log(test)
  }

  async logout () {
    await this.$store.dispatch('logout')
    this.$router.push('/login')
  }
}
</script>
