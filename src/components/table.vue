<template>
  <div>
    <div class="filter-container">
      <span class="bold">Filter:</span>
      <input
        type="text"
        v-model="quickFilterText"
        @input="onQuickFilterChanged"
        placeholder="ex: scream"
      />
    </div>
    <ag-grid-vue
      style="width: 100%; height: 800px"
      :theme="theme"
      :columnDefs="columnDefs"
      :selectionColumnDef="selectionColumnDef"
      :tooltipShowDelay="tooltipShowDelay"
      :tooltipShowMode="tooltipShowMode"
      :autoSizeStrategy="autoSizeStrategy"
      :rowData="rowData"
      :rowSelection="rowSelection"
      @row-selected="onRowSelected"
      @selection-changed="onSelectionChanged"
      @filter-changed="onFilterChanged"
      @grid-ready="onGridReady"
    ></ag-grid-vue>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { updateKills, useChartData } from '../composables/useSharedState';
import { AgGridVue } from 'ag-grid-vue3';
import {
  ModuleRegistry,
  AllCommunityModule,
  TooltipModule,
  themeQuartz,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, TooltipModule]);

const { updateChartData } = useChartData();

const props = defineProps({
  killCountData: {
    type: Object,
    required: true,
  },
});

const gridApi = ref(null);
const gridColumnApi = ref(null);
const quickFilterText = ref('');

// Theme
const myTheme = themeQuartz.withParams({
  accentColor: '#C41415',
  browserColorScheme: 'light',
  columnBorder: true,
  fontFamily: 'inherit',
  fontSize: 14,
  headerColumnBorder: true,
  headerFontSize: 14,
});

const theme = myTheme;

// Column Setup/Functionality
const linkRenderer = params => {
  return `<a href="${params.value}" target="_blank">${params.colDef.field}</a>`;
};
const selectionColumnDef = ref({
  pinned: 'left',
});
const columnDefs = ref([
  {
    headerName: 'Title',
    field: 'Movie Title',
    tooltipField: 'Movie Title',
    pinned: 'left',
    cellStyle: { fontWeight: '700', fontSize: '1rem' },
  },
  {
    headerName: 'Kills',
    field: 'Total Kills',
    tooltipField: 'Total Kills',
    filter: 'agNumberColumnFilter',
  },
  { headerName: 'Male', field: 'Male Kills' },
  { headerName: 'Female', field: 'Female Kills' },
  { headerName: 'Unknown', field: 'Unknown Gender Kills' },
  { headerName: 'Non-human', field: 'Non-human Kills' },
  {
    headerName: 'Rate',
    field: 'Kill Rate',
    tooltipField: 'Kill Rate',
    filter: 'agNumberColumnFilter',
    maxWidth: 80,
  },
  {
    headerName: 'Runtime/Ep.',
    field: 'Runtime/Episodes',
    tooltipField: 'Runtime/Episodes',
    filter: 'agNumberColumnFilter',
    maxWidth: 80,
  },
  {
    headerName: 'Genres',
    field: 'Genres',
    tooltipField: 'Subgenre',
    filter: 'agTextColumnFilter',
    maxWidth: 80,
  },
  {
    headerName: 'Year',
    field: 'Year',
    filter: 'agNumberColumnFilter',
    maxWidth: 80,
  },
  {
    headerName: 'Video',
    field: 'YouTube',
    cellRenderer: linkRenderer,
  },
  { field: 'TMDB', cellRenderer: linkRenderer },
  { field: 'Type', tooltipField: 'Type', filter: 'agTextColumnFilter' },
  {
    field: 'Franchise',
    tooltipField: 'Franchise',
    filter: 'agTextColumnFilter',
  },
  { field: 'Tags', tooltipField: 'Tags', filter: 'agTextColumnFilter' },
]);
const tooltipShowDelay = ref(500);
const tooltipShowMode = ref('whenTruncated');
const autoSizeStrategy = {
  type: 'fitCellContents',
  defaultMinWidth: 80,
};

// Row Setup/Functionality
const rowData = props.killCountData;
const rowSelection = {
  mode: 'multiRow',
  enableClickSelection: true,
};
function onRowSelected() {
  calculateSelectedSum();
}
function onSelectionChanged() {
  calculateSelectedSum();
}

// Quick Filter
const onQuickFilterChanged = () => {
  if (gridApi.value) {
    gridApi.value.setGridOption('quickFilterText', quickFilterText.value);
  }
};

const onGridReady = params => {
  gridApi.value = params.api;
  gridColumnApi.value = params.columnApi;
  if (gridApi.value) {
    calculateOnLoadSum();
  }
};
const onFilterChanged = event => {
  // Check if gridApi is available before calculating
  if (gridApi.value) {
    calculateFilteredSum();
  }
};
// Add up totals of on ready results
const calculateOnLoadSum = () => {
  const rows = [];
  gridApi.value.forEachNode(node => {
    rows.push(node.data);
  });
  // Now 'rows' contains only the visible data
  calculateSum(rows);
};
// Add up totals of filtered results
const calculateFilteredSum = () => {
  const filteredRows = [];
  gridApi.value.forEachNodeAfterFilter(node => {
    filteredRows.push(node.data);
  });
  // Now 'filteredRows' contains only the visible data
  calculateSum(filteredRows);
};
// Add up totals of selected results
const calculateSelectedSum = () => {
  let selectedRows = [];
  const nodesToUpdate = gridApi.value.getSelectedNodes();
  if (nodesToUpdate.length) {
    nodesToUpdate.forEach(node => {
      selectedRows.push(node.data);
    });
    calculateSum(selectedRows);
  }
};
const calculateSum = data => {
  let killSums = {
    total: 0,
    male: 0,
    female: 0,
    unknown: 0,
    nonHuman: 0,
  };
  let chartSums = [0, 0, 0, 0];
  data.forEach(row => {
    // Replace 'yourColumnField' with the actual field name of the column you want to sum
    if (typeof row['Total Kills'] === 'number') {
      killSums.total += row['Total Kills'];
    }
    if (typeof row['Male Kills'] === 'number') {
      killSums.male += row['Male Kills'];
      chartSums[0] = chartSums[0] + row['Male Kills'];
    }
    if (typeof row['Female Kills'] === 'number') {
      killSums.female += row['Female Kills'];
      chartSums[1] = chartSums[1] + row['Female Kills'];
    }
    if (typeof row['Unknown Gender Kills'] === 'number') {
      killSums.unknown += row['Unknown Gender Kills'];
      chartSums[2] = chartSums[2] + row['Unknown Gender Kills'];
    }
    if (typeof row['Non-human Kills'] === 'number') {
      killSums.nonHuman += row['Non-human Kills'];
      chartSums[3] = chartSums[3] + row['Non-human Kills'];
    }
  });
  // Now 'totalSum' holds the sum of the filtered column
  updateKills(killSums);
  updateChartData(chartSums);
};
</script>

<style scoped>
.filter-container {
  gap: 1rem;
  display: flex;
  align-items: center;
  padding-block: 1rem;

  input {
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: 700;
  }
}
</style>
