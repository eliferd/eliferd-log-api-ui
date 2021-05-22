<template>
    <div v-if="isLoading" class="loading">
        <span>
            <font-awesome-icon size="2x" class="spinner" :icon="['fas', 'cog']" />
            <font-awesome-icon size="4x" class="spinner" :icon="['fas', 'cog']" />
            <font-awesome-icon size="2x" class="spinner" :icon="['fas', 'cog']" />
        </span>
    </div>
</template>

<style scoped>
.loading {
  background-color: rgba(255, 255, 255, 0.705);
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display:table;
}
.loading>span {
  display:table-cell;
  vertical-align:middle;
  text-align:center;
}
.spinner {
  color: #1B9662;
  animation: 1.5s linear 0s infinite rotateAnimation;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  get isLoading() {
    return this.$store.getters.isLoading;
  }
}
</script>
