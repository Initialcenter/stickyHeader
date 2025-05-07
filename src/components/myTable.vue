<template>
  <div class="one" style="overflow: initial">
    <div class="two">
      <vxe-grid
        ref="gridRef"
        v-bind="gridOptions"
        class="top-64"
        style="overflow: visible; width: 100%"
      >
      </vxe-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import useVxeTable from "@/hooks/useVxeTable";

@Component({})
export default class myTable extends Vue {
  @Prop({ type: Object, required: true }) private gridOptions!: any;
  mounted() {
    let gridRef = this.$refs.gridRef as Vue;
    const { mounted, destroyed } = useVxeTable(gridRef, { sticky: true });
    mounted();
  }
}
</script>

<style scoped lang="less">
:deep(.top-64 .vxe-table--header-wrapper) {
  top: 0 !important;
}
</style>
