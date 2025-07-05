// composables/useSharedState.js
import { ref } from 'vue';

export const kills = ref({
  total: 0,
  male: 0,
  female: 0,
  unknown: 0,
  nonHuman: 0,
});

export function updateKills(newValue) {
  kills.value = newValue;
}

export function updateSingleKillKey(key, value) {
  // Validate the key exists in the kills object
  if (key in kills.value) {
    kills.value[key] = value;
  } else {
    console.warn(`Key '${key}' does not exist in kills object`);
  }
}

const chartData = ref({
  labels: ['Male', 'Female', 'Unknown', 'Non-Human'],
  datasets: [
    {
      backgroundColor: ['#1D1EC9', '#DF1A19', '#6E6E6E', '#06D648'],
      data: [200, 40, 50, 60],
      datalabels: {
        font: {
          family: 'DNK',
          size: '60rem',
        },
        color: '#ffffff',
        formatter: value => {
          return value > 0 ? value : '';
        },
      },
    },
  ],
});

export function useChartData() {
  // --- MODIFICATION START ---

  // 1. The function now accepts 'newValues' as an argument.
  const updateChartData = newValues => {
    // 2. (Good Practice) Add a check to ensure the input is valid.
    if (!Array.isArray(newValues)) {
      console.error('updateChartData requires an array of new values.');
      return;
    }

    // 3. The random data generation is removed. We use the parameter instead.
    chartData.value = {
      labels: ['Male', 'Female', 'Unknown', 'Non-Human'],
      datasets: [
        {
          data: newValues, // Use the provided newValues here
        },
      ],
    };
    // console.log('Composable updated the chart data with:', newValues);
  };

  // --- MODIFICATION END ---

  // Expose the same state and the updated function
  return {
    chartData,
    updateChartData,
  };
}
