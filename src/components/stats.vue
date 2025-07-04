<template>
  <div class="stats-wrapper font-dnk">
    <div>
      Total Kills:
      <span class="color-dm-red">{{ kills.total }}</span>
    </div>
    <div>
      Male:
      <span class="color-dm-red">{{ kills.male }}</span>
    </div>
    <div>
      Female:
      <span class="color-dm-red">{{ kills.female }}</span>
    </div>
    <div>
      Unknown:
      <span class="color-dm-red">{{ kills.unknown }}</span>
    </div>
    <div>
      Non-human:
      <span class="color-dm-red">{{ kills.nonHuman }}</span>
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
}
</style>
