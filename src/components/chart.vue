<template>
  <div>
    <Pie :data="chartData" />
  </div>
</template>

<script>
import { useStore } from '@nanostores/vue';
import {
  $totalKills,
  $maleKills,
  $femaleKills,
  $unknownKills,
  $nonHumanKills,
} from '../stores/kills.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'Kill Count Pie',
  components: { Pie },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Pie Chart',
    },
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
};
</script>
