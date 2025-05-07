<template>
  <div style="overflow: initial">
    <slot ref="gridRef" class="top-0"></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import useVxeTable from "@/hooks/useVxeTable";

@Component({})
export default class myTable extends Vue {
  private destroyedFun: (() => void | null) | null = null;

  mounted() {
    const gridRef = this.$slots.default;
    // 确保插槽内容是有效的 VNode 数组
    if (gridRef && gridRef.length > 0) {
      const firstChild = gridRef[0].componentInstance as Vue; // 获取第一个 VNode 的组件实例
      if (firstChild) {
        const { mounted, destroyed } = useVxeTable(firstChild, {
          sticky: true,
        });
        this.destroyedFun = destroyed;
        mounted();
      } else {
        console.warn("First child is not a Vue instance");
      }
    } else {
      console.warn("No valid content in slot");
    }
  }

  destroyed() {
    this.destroyedFun?.();
  }
}
</script>

<style scoped lang="less">
:deep(.top-0 .vxe-table--header-wrapper) {
  top: 0 !important;
}
</style>
