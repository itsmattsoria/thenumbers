<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useChartData } from '../composables/useSharedState';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const totalData = ref(null);

ChartJS.register(ArcElement, Legend, ChartDataLabels);

const { chartData } = useChartData();
let maleKillsLabel,
  femaleKillsLabel,
  unknownKillsLabel,
  nonHumanKillsLabel,
  chartLabelsMap;
let activeElement = null;

const chartOptions = {
  name: 'Kill Count Pie',
  components: { Pie },
  responsive: true,
  maintainAspectRatio: true,
  onHover: (event, activeElements) => {
    if (activeElements.length > 0) {
      let index = activeElements[0].index;
      if (activeElement !== null && activeElement !== index) {
        document
          .querySelector('#stat-labels .-active')
          .classList.remove('-active');
      }
      chartLabelsMap[index].classList.add('-active');
      activeElement = index;
    } else {
      let activeLabel = document.querySelector('#stat-labels .-active');
      activeLabel?.classList.remove('-active');
      activeElement = null;
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          family: 'DNK',
          size: 16,
        },
      },
    },
  },
};

onMounted(() => {
  maleKillsLabel = document.querySelector('#male-kills-label');
  femaleKillsLabel = document.querySelector('#female-kills-label');
  unknownKillsLabel = document.querySelector('#unknown-kills-label');
  nonHumanKillsLabel = document.querySelector('#non-human-kills-label');

  chartLabelsMap = [
    maleKillsLabel,
    femaleKillsLabel,
    unknownKillsLabel,
    nonHumanKillsLabel,
  ];
});
</script>
