<template>
    <div>

    </div>
</template>

<style scoped>

</style>

<script lang="ts">
import { LogEntity, LogLevels, LogProvider } from '@/modules/auth'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Logs extends Vue {
    appLogsList: LogEntity[] = [];
    appLogsLevelsList: LogLevels[] = [];
    created () {
      const { StateProviders, StateLogLevels, StateLogs } = this.$store.getters;

      if (!StateProviders.some((p: LogProvider) => p.str_provider_name === this.$route.params.appId)) {
        this.$router.push('/')
      }
      Promise.all([
        this.$store.dispatch('getLevels'),
        this.$store.dispatch('getProviders'),
        this.$store.dispatch('getAppLogs', this.$route.params.appId)
      ]).then(() => {
        this.appLogsList = StateLogs;
        this.appLogsLevelsList = StateLogLevels;
        console.log(this.appLogsList, 'appLogsList');
        console.log(this.appLogsLevelsList, 'appLogsLevelsList');
      }).catch(e => console.log(e))
    }
}
</script>
