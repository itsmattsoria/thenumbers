<template>
  <div>
    <Pie :data="chartData" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChartData } from '../composables/useSharedState';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const totalData = ref(null);

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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

const { chartData } = useChartData();

const chartOptions = {
  name: 'Kill Count Pie',
  components: { Pie },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};
</script>
