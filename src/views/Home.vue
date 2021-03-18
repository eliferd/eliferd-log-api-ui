<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <EliButton label="Bouton" :clickEvent="onTestClick"/>
    <EliButton label="Bouton 2" :disabled="true" :clickEvent="onTestClickTwo"/>
    <br>
    <EliInput :inputType="inputType.NUMBER" inputPlaceholder="Number" inputLabel="ALLO?" :onUserInput="eliInputOne"/>
    <EliInput :inputType="inputType.TEXT" inputPlaceholder="Text" :onUserInput="eliInputOne"/>
    <EliInput :inputType="inputType.PASSWORD" inputPlaceholder="Pwd" :onUserInput="eliInputOne"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import EliButton from '@/components/EliButton.vue'
import EliInput, { EliInputTypeEnum } from '@/components/EliInput.vue'

@Component({
  components: {
    HelloWorld,
    EliButton,
    EliInput
  }
})
export default class Home extends Vue {
  inputType = EliInputTypeEnum;

  onTestClick (): void {
    console.log('ALLO')
  }

  onTestClickTwo (): void {
    console.log('la forme ?')
  }

  eliInputOne (event: Event) {
    console.log(event)
  }
}
</script>
