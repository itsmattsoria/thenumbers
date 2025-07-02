<template>
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
    class="ag-theme-alpine"
    :theme="theme"
    :columnDefs="columnDefs"
    :tooltipShowDelay="tooltipShowDelay"
    :tooltipShowMode="tooltipShowMode"
    :autoSizeStrategy="autoSizeStrategy"
    :rowData="rowData"
    :rowSelection="rowSelection"
    @row-selected="onRowSelected"
    @selection-changed="onSelectionChanged"
    @grid-ready="onGridReady"
  ></ag-grid-vue>
</template>

<script setup>
import { ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import {
  ModuleRegistry,
  themeAlpine,
  AllCommunityModule,
  TooltipModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule, TooltipModule]);

const props = defineProps({
  killCountData: {
    type: Object,
    required: true,
  },
});
const gridApi = ref(null);
const quickFilterText = ref('');
// Theme
const myTheme = themeAlpine.withParams({
  fontFamily: 'Space Mono',
});
const theme = myTheme;

// Column Setup/Functionality
const linkRenderer = params => {
  return `<a href="${params.value}" target="_blank">${params.colDef.field}</a>`;
};
const columnDefs = ref([
  {
    headerName: 'Title',
    field: 'Movie Title',
    tooltipField: 'Movie Title',
    pinned: 'left',
    cellStyle: { fontWeight: 'bold', fontFamily: 'Forevs', fontSize: '1.2rem' },
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
    field: 'Subgenre',
    tooltipField: 'Subgenre',
    filter: 'agTextColumnFilter',
    maxWidth: 80,
  },
  {
    headerName: 'Year',
    field: 'Release Year',
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
const rowData = props.killCountData.slice(0, -1);
const rowSelection = {
  mode: 'multiRow',
  enableClickSelection: true,
};
function onRowSelected(event) {
  console.log(
    'row ' +
      event.node.data['Movie Title'] +
      ' selected = ' +
      event.node.isSelected()
  );
}
function onSelectionChanged(event) {
  const rowCount = event.selectedNodes?.length;
  console.log('selection changed, ' + rowCount + ' rows selected');
}

// Quick Filter
const onQuickFilterChanged = () => {
  if (gridApi.value) {
    gridApi.value.setGridOption('quickFilterText', quickFilterText.value);
  }
};

const onGridReady = params => {
  gridApi.value = params.api;
};
</script>

<style scoped>
.filter-container {
  padding-block: 1rem;

  input {
    font-size: 1rem;
    padding: 0.5rem;
    font-weight: 700;
  }
}
</style>
