<template>
    <EliButton label="Déconnexion" variant="red" icon="power-off" :small="small" v-on:click.native="logout()"/>
</template>
<style scoped>

</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import EliButton from '@/components/EliButton.vue';

@Component({
  components: {
    EliButton
  }
})
export default class DisconnectButton extends Vue {
    @Prop({ default: false }) small!: boolean;
    async logout () {
      await this.$store.dispatch('logout');
      this.$router.push('/login');
    }
}
</script>
