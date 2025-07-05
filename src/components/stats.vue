<template>
  <div id="stat-labels" class="stats-wrapper font-dnk">
    <div id="male-kills-label" class="color-chart-blue">
      Male:
      <span class="color-black">{{ kills.male }}</span>
    </div>
    <div id="female-kills-label" class="color-chart-red">
      Female:
      <span class="color-black">{{ kills.female }}</span>
    </div>
    <div id="unknown-kills-label" class="color-chart-gray">
      Unknown:
      <span class="color-black">{{ kills.unknown }}</span>
    </div>
    <div id="non-human-kills-label" class="color-chart-green">
      Non-human:
      <span class="color-black">{{ kills.nonHuman }}</span>
    </div>
    <div class="total color-dm-red">
      Total Kills:
      <span class="color-black">{{ kills.total }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { kills } from '../composables/useSharedState';

export default {
  data() {
    return {
      kills: kills, // Exposing the imported constant to data
    };
  },
};
</script>

<style scoped>
.stats-wrapper {
  font-size: 3rem;
  font-weight: bold;

  > div {
    width: max-content;
    transform-origin: left center;
    transition: transform 0.2s ease-out;
    &.-active {
      transform: scale(1.1);
    }

    &.total {
      margin-block-start: 0.25em;
      padding-block-start: 0.25em;
      border-top: 3px solid var(--color-black);
    }
  }
}
</style>
