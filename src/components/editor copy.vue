<template>
  <div ref="editorBox" class="editorBox"></div>
</template>

<script setup lang="ts">
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// import * as monaco from "monaco-editor";
import { onMounted, reactive, ref, watch, toRaw, onUnmounted, nextTick } from "vue";
// import sass from 'sass.js';

declare function require(moduleNames: string[], onLoad: (...args: any[]) => void): void;

const props = defineProps({
  language: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  isError: {
    type: Boolean,
    default: false,
  }
});

const emits = defineEmits(['update:modelValue', 'update:isError']);
const monacoDiffInstance = ref<any>(null);
const contentChanged = ref<boolean>(false);
const editorBox = ref<any>();
const monacoRef = ref<any>();

// 编辑器配置项
const defaultOpts = reactive<any>({
  language: props.language,
  value: props.modelValue, // 编辑器的值
  theme: "vs", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
  roundedSelection: true, // 右侧不显示编辑器预览框
  autoIndent: true, // 自动缩进
  automaticLayout: true,
  contextmenu: false, // 右键菜单
  acceptSuggestionOnEnter: "on",
  lineNumbers: 'on',
  lineNumbersMinChars: 4,
  foldingStrategy: "indentation", // 代码可分小段折叠
  folding: true, // 是否启用代码折叠
  cursorBlinking: 'smooth', // 光标动画样式
  cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
  minimap: {
    enabled: false, // 关闭代码缩略图
  },
  overflow: 'hidden', // 隐藏溢出内容，包括横向滚动条
  wordWrap: 'bounded', // 开启单词换行
});

onMounted(() => {
  // nextTick(() => {
    init();
  // })
});

// 注销组件之前注销编辑器
onUnmounted(() => {
  toRaw(monacoDiffInstance.value)?.dispose();
});

// 监听当前是否可以更新内容
watch(() => contentChanged.value, (newVal) => {
  if (newVal) {
    // const content = toRaw(monacoDiffInstance.value)?.getValue();
    // console.log(123)
    // if (props.language === 'scss') {
    //   sass.compile(content, function (result: any) {
    //     if (result.status === 0) {
    //       // 编译成功，result.text 包含编译后的 CSS 代码
    //       console.log(result, result.text, 'result.textresult.textresult.textresult.textresult.textresult.text')
    //       emits('update:modelValue', result.text);
    //     } else {
    //       // 编译失败，result.message 包含错误信息
    //       console.error(result.message);
    //     }
    //   });
    // } else {
    //   emits('update:modelValue', content);
    // }
    // 重置状态
    // contentChanged.value = false;
  }
})

// 监听当前是否可以进行语言变更
watch(() => props.language, (newVal, oldVal) => {
  if (monacoDiffInstance.value && newVal !== oldVal) {
    monacoRef.value?.editor?.setModelLanguage(toRaw(monacoDiffInstance.value)?.getModel(), newVal);
  }
})

// // 监听当前是否可以进行语言变更
// watch(() => props.modelValue, (newVal, oldVal) => {
// })

/**
 * 初始化
 */
const init = () => {
  // 在 Monaco Editor 脚本加载后初始化编辑器
  require(['vs/editor/editor.main'], (monaco: any) => {
    monacoRef.value = monaco;
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
    // 设置主题
    monaco.editor.setTheme("myTheme");

    // 将接口查询的值放到编辑器中
    // if (props.modelValue) {
    //   console.log(45454545454545)
    //   toRaw(monacoDiffInstance.value)?.setValue(props.modelValue);
    //   console.log(45454545454545666666666666666)
    // }
    // 实时获取内容变更
    monacoDiffInstance.value.onDidChangeModelContent((e: any) => {
      contentChanged.value = true;
      console.log(e)
      const content = toRaw(monacoDiffInstance.value)?.getValue();
      // if (props.language === 'scss') {
      //   console.log('scssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscssscss')
      //   Sass.compile(content, function (result: any) {
      //     console.log(1212)
      //     if (result.status === 0) {
      //       // 编译成功，result.text 包含编译后的 CSS 代码
      //       console.log(result, result.text, 'result.textresult.textresult.textresult.textresult.textresult.text')
      //       emits('update:modelValue', result.text);
      //     } else {
      //       // 编译失败，result.message 包含错误信息
      //       console.error(result.message);
      //     }
      //   });
      // } else {
      //   emits('update:modelValue', content);
      // }
      emits('update:modelValue', content);
    });

    // 实时获取编辑器错误信息
    monaco.editor.onDidChangeMarkers(() => {
      const markers = monaco.editor.getModelMarkers({ resource: toRaw(monacoDiffInstance.value).getModel()?.uri })
      // const markers = monaco.editor.getModelMarkers({ owner: 'owner' });
      // markers.forEach((marker: any) => {
      //   if (marker.severity === monaco.MarkerSeverity.Error) {
      //     console.log(`Error: ${marker.message} at line ${marker.startLineNumber}`);
      //   } else if (marker.severity === monaco.MarkerSeverity.Warning) {
      //     console.log(`Warning: ${marker.message} at line ${marker.startLineNumber}`);
      //   }
      // });
      // 判断当前是否存在语法错误
      const newMarkers = markers.filter((item: any) => {
        console.log(item)
        return item.severity === monaco.MarkerSeverity.Error
      })
      if (newMarkers.length > 0) {
        console.log(newMarkers, props.language, 'newMarkersnewMarkersnewMarkersnewMarkersnewMarkersnewMarkers')
        emits('update:isError', true);
      } else {
        emits('update:isError', false);
      }
      // markers是返回的错误信息数组，可赋值给需要判断语法错误的关键词，如this.coderErrors = markers
    })

    // 监听失去焦点事件
    // editorBox.value.addEventListener('focusout', (event: any) => {
    //   console.dir(event.target);
    //   sessionStorage.setItem(`${props.language}Code`, toRaw(monacoDiffInstance.value)?.getValue())
    // });
    monaco.editor?.setModelLanguage(toRaw(monacoDiffInstance.value)?.getModel(), props.language);
    // changeEditorValue();

  });
};

// const changeEditorValue = () => {
//   console.log(sessionStorage.getItem(`cssCode`))
//   if (sessionStorage.getItem(`${props.language}Code`)) {
//     console.log(props.language, sessionStorage.getItem(`${props.language}Code`))
//     toRaw(monacoDiffInstance.value)?.setValue(sessionStorage.getItem(`${props.language}Code`));
//   }
// }
</script>

<style scoped lang="scss">
.editorBox {
  width: 100%;
  height: calc(100% - 24px);

  :deep(.monaco-editor) {

    // .overflow-guard .margin, .overflow-guard .margin .margin-view-overlays, .current-line.current-line-margin-both, .line-numbers.active-line-number{
    //   width: fit-content !important;
    //   min-width: 30px;
    //   text-align: center;
    // }
    .view-line {
      text-align: left;
    }

    // .view-overlays {
    //   width: 100% !important;
    //   line-height: 1.5 !important;
    //   div {
    //     width: 100% !important;
    //     height: fit-content !important;
    //     white-space: wrap;
    //     word-break: break-all;
    //   }
    // }
    // .lines-content.monaco-editor-background {
    //   width: 100% !important;
    // }
    // .view-lines.monaco-mouse-cursor-text {
    //   width: 100% !important;
    //   height: fit-content !important;
    //   line-height: 1.5 !important;
    //   div {
    //     width: 100% !important;
    //     height: fit-content !important;
    //     white-space: wrap;
    //     word-break: break-all;
    //   }
    // }
  }
}
</style>
