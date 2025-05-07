// 必须套两层父盒子，因为发现vxetable会检测自身及父盒子高度的变化改变vxe-body--y-space的计算，高度会乱跳
import useEventListener from "./useEventListener";
import { Vue } from "vue-property-decorator";
interface UseVxeTableParams {
  sticky?: boolean;
  virtualSticky?: boolean;
  colSticky?: boolean;
}

export default function (gridRef: Vue, options: UseVxeTableParams) {
  const { sticky, virtualSticky, colSticky } = options || {};
  const scrollbar = document.createElement("div");
  const scrollerContainer = document.createElement("div");
  let gridElement: HTMLElement | null = null;
  let tableBodyWrapper: HTMLElement | null = null;
  let resizeObserver: ResizeObserver | null;

  const setStyle = () => {
    if (!gridElement) return;
    gridElement.setAttribute("data-table-sticky", "true");
    if (document.getElementById("x-vxe-table-style")) return;
    const style = document.createElement("style");
    console.log("sticky");
    style.id = "x-vxe-table-style";
    style.innerHTML = `
        [data-table-sticky="true"] .vxe-grid--table-wrapper {
          overflow: initial;
          min-width: 0;
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper {
          position: sticky !important;
          top: 0;
          z-index: 2;
        }
        [data-table-sticky="true"] .vxe-table--fixed-left-wrapper,
        [data-table-sticky="true"] .vxe-table--fixed-right-wrapper {
          overflow: initial;
          overflow-x: clip;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-left--wrapper {
          overflow: hidden;
        }

       /*  [data-table-sticky="true"] .vxe-table--viewport-wrapper {
          overflow: visible;
          overflow-x: visible;
        }
        [data-table-sticky="true"] .vxe-grid--layout-body-wrapper {
          overflow: visible;
          overflow-x: visible;
        }
        [data-table-sticky="true"] .vxe-grid--layout-body-content-wrapper {
          overflow: visible;
          overflow-x: visible;
        }*/

        [data-table-sticky="true"] .vxe-table--render-default .vxe-table--fixed-left-wrapper .vxe-table--body-wrapper {
          width: 100%;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-right--wrapper {
          width: inherit;
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper.fixed-right--wrapper .vxe-table--body {
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper.fixed-right--wrapper {
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--header-wrapper.fixed-right--wrapper .vxe-table--header {
          transform: scaleX(-1);
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper {
          overflow-y: hidden !important;
          scrollbar-height: none;
        }
        [data-table-sticky="true"] .vxe-table--body-wrapper::-webkit-scrollbar {
          display: none;
          height: 0;
        }
        .x-vxetable--scrollbar {
          position: sticky;
          bottom: 0;
          z-index: 5;
          background-color: transparent;
          overflow-x: auto;
        }
        .x-vxetable--scrollbar .x-vxetable--scrollbar-container {
          height: 1px;
          pointer-events: none;
          background-color: transparent;
        }
      `;
    document.head.appendChild(style);
  };

  const getElements = () => {
    if (!gridRef) return;
    gridElement = gridRef.$el as HTMLElement;
    tableBodyWrapper = gridElement!.querySelector(
      ".vxe-table--body-wrapper"
    ) as HTMLElement;
    console.log(tableBodyWrapper, "d1");
  };

  const createScrollbar = () => {
    if (!gridElement) return;
    const tableElement = gridElement.querySelector(".vxe-table") as HTMLElement;
    scrollbar.classList.add("x-vxetable--scrollbar");
    scrollerContainer.classList.add("x-vxetable--scrollbar-container");
    scrollbar.appendChild(scrollerContainer);
    tableElement?.appendChild(scrollbar);
  };

  const setScrollbarWidth = (entries: ResizeObserverEntry[]) => {
    for (const entry of entries) {
      scrollerContainer.style.width = `${entry.target.clientWidth}px`;
    }
  };

  const setObserver = () => {
    if (!gridElement) return;
    const tableBodyElement = gridElement.querySelector(
      ".vxe-table--body"
    ) as HTMLElement;
    if (ResizeObserver) {
      // resizeObserver = new ResizeObserver(setScrollbarWidth);
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          setScrollbarWidth;
        });
      });
      resizeObserver.observe(tableBodyElement);
    }
  };

  const barScroll = () => {
    console.log("barScroll");
    if (!tableBodyWrapper) return;
    tableBodyWrapper.scrollLeft = scrollbar.scrollLeft;
  };

  const tableBodyScroll = () => {
    console.log("tableBodySCroll");
    if (!tableBodyWrapper) return;
    scrollbar.scrollLeft = tableBodyWrapper.scrollLeft;
  };

  useEventListener(scrollbar, "scroll", barScroll);
  useEventListener(tableBodyWrapper, "scroll", tableBodyScroll);

  return {
    mounted() {
      getElements();
      setStyle(); // 需在getElements后
      createScrollbar();
      setObserver();
    },
    destroyed() {
      resizeObserver && resizeObserver.disconnect();
    },
  };
}
