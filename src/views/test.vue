<template>
  <div>
    <stickyTable>
      <vxe-table
        :data="qualityIndicatorsData"
        align="center"
        border
        style="margin-top: 10px"
      >
        <vxe-column field="monday" title="周一"></vxe-column>
        <vxe-column field="tuesday" title="周二"></vxe-column>
        <vxe-column field="wednesday" title="周三"></vxe-column>
      </vxe-table>
    </stickyTable>

    <myTable :grid-options="gridOptions" style="margin-top: 20px"></myTable>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import stickyTable from "@/components/stickyTable.vue";
import myTable from "@/components/myTable.vue";
interface qualityIndicatorsDataType {
  monday: number;
  tuesday: number;
  wednesday: number;
}

@Component({
  components: {
    stickyTable,
    myTable,
  },
})
export default class test extends Vue {
  private qualityIndicatorsData: qualityIndicatorsDataType[] = [];
  mounted() {
    this.qualityIndicatorsData = Array.from({ length: 100 }, (_, index) => ({
      monday: index,
      tuesday: index,
      wednesday: index,
    }));

    this.gridOptions.data = Array.from({ length: 100 }, (_, index) => ({
      col0: index,
      col2: index,
      col3: index,
      col4: index,
      col5: index,
      col6: index,
      col7: index,
      col8: index,
    }));
  }
  private gridOptions: any = {
    border: true,
    loading: false,
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: false,
      gt: 0,
    },
    columns: [
      { title: "列0", field: "col0", width: 100 },
      { title: "列2", field: "col1", width: 300 },
      { title: "列3", field: "col2", width: 300 },
      { title: "列4", field: "col3", width: 300 },
      { title: "列5", field: "col4", width: 300 },
      { title: "列6", field: "col5", width: 200 },
      { title: "列7", field: "col6", width: 200 },
      { title: "列8", field: "col7", width: 200, fixed: "right" },
    ],
    data: [],
  };
}
</script>

<style scoped></style>
