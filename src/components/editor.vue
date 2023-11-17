<template>
  <div ref="editorBox" class="editorBox"></div>
</template>

<script setup lang="ts">
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import * as monaco from "monaco-editor";
import { onMounted, onUnmounted, reactive, ref, watch, toRaw } from "vue";

const props = defineProps({
  language: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emits = defineEmits(['update:modelValue']);

const monacoDiffInstance = ref<any>(null);
const contentChanged = ref<boolean>(false);
const editorBox = ref<any>();

// 编辑器配置项
const defaultOpts = reactive<any>({
  language: props.language,
  value: "", // 编辑器的值
  theme: "vs", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
  roundedSelection: true, // 右侧不显示编辑器预览框
  autoIndent: true, // 自动缩进
  automaticLayout: true,
  contextmenu: false, // 右键菜单
  acceptSuggestionOnEnter: "on",
  lineNumbers: "on", // 行号
  foldingStrategy: "indentation", // 代码可分小段折叠
  folding: true, // 是否启用代码折叠
  cursorBlinking: 'smooth', // 光标动画样式
  cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
  minimap: {
    enabled: false, // 关闭代码缩略图
  },
});

onMounted(() => {
  init();
});

// 注销组件之前注销编辑器
// onUnmounted(() => {
//   monacoDiffInstance.value.dispose();
// });

// 监听当前是否可以更新内容
watch(() => contentChanged.value, (newVal) => {
  if (newVal) {
    const content = toRaw(monacoDiffInstance.value).getValue();
    emits('update:modelValue', content);
    // 重置状态
    contentChanged.value = false;
  }
})

/**
 * 初始化
 */
const init = () => {
  monacoDiffInstance.value = monaco.editor.create(editorBox.value, defaultOpts);
  monaco.editor.defineTheme("myTheme", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.foreground": "#000000",
      "editor.background": "#f8f8f8",
      "editorCursor.foreground": "#8B0000",
      "editor.lineHighlightBackground": "#0000FF20",
      "editorLineNumber.foreground": "#008800",
      "editor.selectionBackground": "#88000030",
      "editor.inactiveSelectionBackground": "#88000015",
    },
  });
  monaco.editor.setTheme("myTheme");
  monacoDiffInstance.value.onDidChangeModelContent((e: any) => {
    contentChanged.value = true;
  });
};
</script>

<style scoped lang="scss">
.editorBox {
  width: 100%;
  height: 100%;
  :deep(.monaco-editor) {
    // .overflow-guard .margin, .overflow-guard .margin .margin-view-overlays, .current-line.current-line-margin-both, .line-numbers.active-line-number{
    //   width: fit-content !important;
    //   min-width: 30px;
    //   text-align: center;
    // }
    .view-line {
      text-align: left;
    }
  }
}
</style>
