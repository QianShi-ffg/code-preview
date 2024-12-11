<template>
  <div class="demoDetail">
    <header class="header">
      <div class="goHome" title="GoHome" @click="backToHome">GoHome</div>
      <input type="text" v-model="content.name" class="name">
      <div class="btnList">
        <button @click="save" class="runBtn">保 存</button>
        <button @click="init" class="runBtn">运 行</button>
      </div>
    </header>
    <main class="main">
      <!-- <router-view></router-view> -->
      <div class="main-left"></div>
      <div class="main-right">
        <div class="editor" ref="editorList">
          <div class="editor-item item-html">
            <div class="editor-item-header" data-title="html">
              <span>
                <selectVue
                  :option="htmlOption"
                  v-model="htmlSelectVal"
                  type="html"
                ></selectVue>
              </span>
            </div>
            <Editor
              :language="htmlSelectVal"
              v-model="content.html"
              v-model:is-error="htmlIsError"
            />
          </div>
          <splitMove direction="horizontal"></splitMove>
          <div class="editor-item item-css">
            <div class="editor-item-header" data-title="css">
              <span>
                <selectVue
                  :option="cssOption"
                  v-model="cssSelectVal"
                  type="css"
                ></selectVue>
              </span>
            </div>
            <Editor
              :language="cssSelectVal"
              v-model="content.css"
              v-model:is-error="cssIsError"
            />
          </div>
          <splitMove direction="horizontal"></splitMove>
          <div class="editor-item item-js">
            <div class="editor-item-header" data-title="javascript">
              <span>
                <selectVue
                  :option="jsOption"
                  v-model="jsSelectVal"
                  type="js"
                ></selectVue>
              </span>
            </div>
            <Editor
              :language="jsSelectVal"
              v-model="content.javascript"
              v-model:is-error="jsIsError"
            />
          </div>
        </div>
        <splitMove direction="vertical"></splitMove>
        <div class="preview" ref="preview"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Editor from "../components/editor.vue";
import splitMove from "../components/splitMove.vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import selectVue from "../components/select.vue";
import loadingHook from "../hooks/loadingHook";
import useSwitchLanguage from '@/hooks/switchLanguage';
import { saveDemoList, getRunning } from '@/api/api';
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
const router = useRouter();
const route = useRoute();
const { switchCss } = useSwitchLanguage()

const backToHome = () => {
  router.push("/");
};

const editorList = ref<Element | Node | undefined>();

const preview = ref<any>();
const content = reactive<any>({
  html: '',
  css: '',
  javascript: '',
  js: '',
  name: ''
});

const htmlSelectVal = ref<string>('');
const cssSelectVal = ref<string>('');
const jsSelectVal = ref<string>('');
const htmlOption = [
  {
    value: "html",
    label: "html",
  },
];
const cssOption = [
  {
    value: "css",
    label: "css",
  },
  {
    value: "scss",
    label: "scss",
  },
];
const jsOption = [
  {
    value: "javascript",
    label: "javascript",
  },
];

const cssIsError = ref<boolean>(false);
const htmlIsError = ref<boolean>(false);
const jsIsError = ref<boolean>(false);

loadingHook.value = true;
onMounted(() => {
  htmlSelectVal.value = "html";
  cssSelectVal.value = "css";
  jsSelectVal.value = "javascript";
  setTimeout(() => {
    loadingHook.value = false;
  }, 4000);
});

const init = async() => {
  console.log(
    cssIsError.value,
    jsIsError.value,
    htmlIsError.value,
    content.css
  );
  const newCssVal = (await switchCss(cssSelectVal.value, content.css) as any)?.css
  if (!cssIsError.value && !jsIsError.value && !htmlIsError.value) {
    preview.value.innerHTML = "<iframe class='iframeDom'></iframe>";
    const iframe = document.querySelector("iframe");
    const iframeDoc =
      iframe?.contentDocument || iframe?.contentWindow?.document;
    iframeDoc?.open();
    // 构建内容
    const res:any = await getRunning(content)
    if (res.code === 200) {
      content.js = res.data[0].javascript.code
    } else {
      content.js = content.javascript
    }
    let iframeContent = `${content.html}<style>${newCssVal}</style><script type="module">${content.js}<\/script>`;
    iframeDoc?.write(iframeContent);
    iframeDoc?.close();
  } else {
    if (htmlIsError.value) {
      alert(`${htmlSelectVal.value}语法错误`);
    }
    if (cssIsError.value) {
      alert(`${cssSelectVal.value}语法错误`);
    }
    if (jsIsError.value) {
      alert(`${jsSelectVal.value}语法错误`);
    }
  }
};

const save = async () => {
  if (userStore.getUserInfo && userStore.getUserInfo.id) {
    const res = await saveDemoList(Object.assign(content, { userId: userStore.getUserInfo.id }))
    console.log(res)
  } else {
    alert('请先登录')
    router.push('/login')
  }
}
</script>

<style scoped lang="scss">
.demoDetail {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .header {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #f8f8f8;
    box-sizing: border-box;
    .name {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 450px;
      height: 34px;
      border: 1px solid #c9c9ea;
      border-radius: 10px;
      padding: 0 5px;
      font-size: 16px;
      text-align: center;
      transition: all 0.3s;
      &:focus-visible {
        outline: none;
        // border: 1px solid #c9c9ea;
      }
      &:focus {
        box-shadow: 0 0 3px 1px #bfbfe7;
      }
      &:hover {
        box-shadow: 0 0 3px 1px #bfbfe7;
      }
    }
    .goHome {
      padding: 1px 15px 1px 5px;
      position: relative;
      top: 0px;
      left: 20px;
      cursor: pointer;
      // background-color: red;
      clip-path: polygon(0px 0px, 80% 0px, 100% 50%, 80% 100%, 0px 100%);
      overflow: hidden;

      &::after {
        position: absolute;
        top: 0;
        left: -100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 5px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        content: attr(title);
        background-color: #c9c9ea;
        transition: all 0.5s;
      }

      &:hover {
        &::after {
          left: 0;
          color: #fff;
        }

        color: transparent;
      }
    }
    .btnList {
      position: absolute;
      right: 30px;
      display: inline-block;
      .runBtn {
        width: 80px;
        height: 32px;
        border: none;
        // background: #c9c9ea;
        border-radius: 6px;
        box-shadow: 0 0 5px 0 inset #a174e7;
        cursor: pointer;
        transition: box-shadow 0.4s, translateY 0.2s;
        color: #a174e7;
        margin-left: 10px;
        &:hover {
          box-shadow: 0 0 5px 0 inset #c9c9ea, 0 0 10px 5px inset #a174e7,
            0 0 3px 0px #a174e7;
          // background: radial-gradient(#c9c9ea, #a174e7);
        }
  
        &:active {
          transform: scale(1.05);
          // background: radial-gradient(#c9c9ea, #a174e7);
        }
      }
    }
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 64px);

    .main-right {
      height: 100%;
      min-width: 100vw;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      .editor {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: 45%;

        .editor-item {
          width: calc((100% - 30px) / 3);

          .editor-item-header {
            width: 100%;
            height: 24px;
            border-bottom: 1px solid #f8f8f8;
            text-align: left;
            padding-left: 50px;
            box-sizing: border-box;

            span {
              display: inline-block;
              height: 100%;
              padding: 0 5px;
              background: #f8f8f8;

              select {
                background: rgba(0, 0, 0, 0);
                width: fit-content;
                min-width: 80px;
                height: 100%;
                font-size: 16px;
                color: #000;
                text-align: center;
                border: none;
                border-radius: 0px;
                outline: unset;
              }

              option {
                color: black;
                background: #a6e1ec;
                line-height: 20px;
                border-radius: 0;
              }

              option:hover {
                background: #ebccd1;
              }
            }
          }
        }
      }

      .preview {
        width: 100%;
        flex: 1;
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
