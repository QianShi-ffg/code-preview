<template>
  <div
    ref="splitMove"
    class="splitMove"
    :class="props.direction === 'horizontal' ? 'horizontal' : 'vertical'"
    @mousedown="handleMouseDown"
  >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  direction: {
    type: String,
    default: "horizontal",
  },
});

const splitMove = ref<any>();

onMounted(() => {
});

// 鼠标单击触发拖拽事件
const handleMouseDown = () => {
  document.addEventListener('mousemove', handleMousemove);
  document.addEventListener('mouseup', handleMouseup);
};

const handleMousemove = (e: any) => {
  // 获取当前组件左右两边dom元素信息
  const { left: pLeft, top: pTop } = splitMove.value.previousElementSibling.getBoundingClientRect()
  const { left: nLeft } = splitMove.value.nextElementSibling.getBoundingClientRect()
  if (props.direction === 'horizontal') {
    // 判断临界值
    if (e.clientX - pLeft < 300 || splitMove.value.nextElementSibling.offsetWidth - (e.clientX - nLeft) < 300) {
      return
    }
    // left不为0时先去掉left值 e.pageX - left
    splitMove.value.previousElementSibling.style.width = `${e.clientX - pLeft}px`
    splitMove.value.nextElementSibling.style.width = `${splitMove.value.nextElementSibling.offsetWidth - (e.clientX - nLeft)}px`
  } else {
    // 判断临界值
    if ((e.clientY - pTop) < 160) {
      return
    }
    // top不为0时先去掉top值 e.pageY - top
    splitMove.value.previousElementSibling.style.height = `${e.clientY - pTop}px`
  }
};

// 抬起鼠标按键注销事件
const handleMouseup = () => {
  document.removeEventListener('mousemove', handleMousemove);
  document.removeEventListener('mouseup', handleMouseup);
};
</script>

<style scoped lang="scss">
.splitMove {
  background: #f1f1f1;
}
.vertical {
  height: 15px;
  width: 100%;
  cursor: row-resize;
}
.horizontal {
  height: 100%;
  width: 15px;
  cursor: col-resize;
}
.drag-active {
  cursor: row-resize;
}
</style>
