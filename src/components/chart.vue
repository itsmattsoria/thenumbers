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

ChartJS.defaults.plugins.tooltip.titleFont = () => ({
  family: 'Space Mono',
  size: 14,
  lineHeight: 1.2,
});
ChartJS.defaults.plugins.tooltip.bodyFont = () => ({
  family: 'DNK',
  size: 36,
  lineHeight: 1.2,
});
ChartJS.defaults.plugins.tooltip.backgroundColor = '#ffffff';
ChartJS.defaults.plugins.tooltip.bodyColor = '#000000';
ChartJS.defaults.plugins.tooltip.titleColor = '#000000';
ChartJS.defaults.plugins.tooltip.displayColors = false;

export default {
  name: 'Kill Count Pie',
  components: { Pie },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      enabled: true,
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
