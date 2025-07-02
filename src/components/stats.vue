<template>
  <div class="stats-wrapper">
    <div>
      Total Kills: <span class="font-dnk color-dm-red">{{ totalKills }}</span>
    </div>
    <div>
      Male: <span class="font-dnk color-dm-red">{{ maleKills }}</span>
    </div>
    <div>
      Female: <span class="font-dnk color-dm-red">{{ femaleKills }}</span>
    </div>
    <div>
      Unknown: <span class="font-dnk color-dm-red">{{ unknownKills }}</span>
    </div>
    <div>
      Non-human: <span class="font-dnk color-dm-red">{{ nonHumanKills }}</span>
    </div>
  </div>
</template>

<script>
import {
  $totalKills,
  $maleKills,
  $femaleKills,
  $unknownKills,
  $nonHumanKills,
} from '../stores/kills.js';

export default {
  props: {
    totalKills: {
      type: Number,
      required: true,
    },
    maleKills: {
      type: Number,
      required: true,
    },
    femaleKills: {
      type: Number,
      required: true,
    },
    unknownKills: {
      type: Number,
      required: true,
    },
    nonHumanKills: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    $totalKills.set(this.totalKills);
    $maleKills.set(this.maleKills);
    $femaleKills.set(this.femaleKills);
    $unknownKills.set(this.unknownKills);
    $nonHumanKills.set(this.nonHumanKills);
  },
};
</script>

<style scoped>
.stats-wrapper {
  font-size: 2rem;
  font-weight: bold;
}
</style>
