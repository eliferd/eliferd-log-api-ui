<template>
  <div class="home">
    <h1>Bienvenue, {{ fullname }}</h1>
    <p>Cliquez sur un des boutons ci-dessous pour choisir l’application à observer.</p>
    <div class="button-list">
      <EliButton v-for="element of logsList" :key="element.id" :label="element.label" :clickEvent="navigateToAppLogPage"/>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-weight: normal;
  text-align: center;
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

  navigateToAppLogPage (event: MouseEvent, btnId: string) {
    console.log(btnId)
  }
}
</script>
