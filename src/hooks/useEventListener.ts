export default function useEventListener(
  target: EventTarget | HTMLElement | null, // 目标元素
  event: string, // 事件类型
  handler: (e: Event) => void // 事件处理函数
) {
  let currentTarget: EventTarget | HTMLElement | null = target;

  // 更新事件监听器
  const updateEventListener = () => {
    // 如果当前目标元素不为空，则添加事件监听器
    if (currentTarget) {
      currentTarget.addEventListener(event, handler);
    }
  };

  // 移除事件监听器
  const removeEventListener = () => {
    if (currentTarget) {
      currentTarget.removeEventListener(event, handler);
    }
  };

  // 返回方法供外部使用
  return {
    mounted() {
      updateEventListener(); // 组件挂载时添加事件监听
    },
    destroyed() {
      removeEventListener(); // 组件销毁时移除事件监听
    },
    updateTarget(newTarget: EventTarget | HTMLElement | null) {
      removeEventListener(); // 移除当前事件监听
      currentTarget = newTarget; // 更新目标
      updateEventListener(); // 添加新的事件监听
    },
  };
}
/*
mounted() {
  // 获取 ref 中的元素
  let test = this.$refs.tableBodyWrapper as HTMLElement;

  // 使用 useEventListener 函数，传入目标元素、事件类型和处理函数
  const { mounted, destroyed } = useEventListener(test, 'scroll', this.setFixedClass);

  // 手动触发 mounted 和 destroyed 生命周期钩子
  mounted();

  // 监听组件销毁时移除事件监听
  this.$once('hook:beforeDestroy', destroyed);
}*/
