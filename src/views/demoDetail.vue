<template>
  <div class="demoDetail">
    <header class="header">
      <div class="goHome" title="GoHome" @click="backToHome">GoHome</div>
      <button @click="init" class="runBtn">运 行</button>
    </header>
    <main class="main">
      <!-- <router-view></router-view> -->
      <div class="main-left"></div>
      <div class="main-right">
        <div class="editor" ref="editorList">
          <div class="editor-item item-html">
            <div class="editor-item-header" data-title="html"></div>
            <Editor ref="editorBox" language="html" v-model="content.html" />
          </div>
          <splitMove direction="horizontal"></splitMove>
          <div class="editor-item item-css">
            <div class="editor-item-header" data-title="css">
              <span>
                <selectVue :option="cssOption" v-model="cssSelectVal"></selectVue>
              </span>
            </div>
            <Editor ref="editorBox" :language="cssSelectVal" v-model="content.css" />
          </div>
          <splitMove direction="horizontal"></splitMove>
          <div class="editor-item item-js">
            <div class="editor-item-header" data-title="javascript"></div>
            <Editor ref="editorBox" language="javascript" v-model="content.js" />
          </div>
        </div>
        <splitMove direction="vertical"></splitMove>
        <div class="preview" ref="preview"></div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Editor from '../components/editor.vue'
import splitMove from '../components/splitMove.vue'
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import sass from 'sass.js';
import selectVue from '../components/select.vue';

const router = useRouter();

const backToHome = () => {
  router.push('/');
};

const editorList = ref<Element | Node | undefined>();

const preview = ref<any>();
const content = reactive<any>({
  html: '',
  css: '',
  js: ''
})

const cssSelectVal = ref<string>('')
const cssOption = [
  {
    value: 'css',
    label: 'css'
  },
  {
    value: 'scss',
    label: 'scss'
  },
]

const init = () => {

  preview.value.innerHTML = "<iframe class='iframeDom'></iframe>";
  const iframe = document.querySelector('iframe')
  const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
  iframeDoc?.open();
  // 构建内容
  let iframeContent = `${content.html}<style>${content.css}</style><script>${content.js}<\/script>`;
  iframeDoc?.write(iframeContent);
  iframeDoc?.close();
}


</script>

<style scoped lang="scss">
.demoDetail {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #f8f8f8;
    box-sizing: border-box;

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

    .runBtn {
      position: absolute;
      right: 30px;
      display: inline-block;
      width: 80px;
      height: 32px;
      border: none;
      // background: #c9c9ea;
      border-radius: 6px;
      box-shadow: 0 0 5px 0 inset #a174e7;
      cursor: pointer;
      transition: box-shadow 0.4s, translateY 0.2s;
      color: #a174e7;

      &:hover {
        box-shadow: 0 0 5px 0 inset #c9c9ea, 0 0 10px 5px inset #a174e7, 0 0 3px 0px #a174e7;
        // background: radial-gradient(#c9c9ea, #a174e7);
      }

      &:active {
        transform: scale(1.05);
        // background: radial-gradient(#c9c9ea, #a174e7);
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
              select{
                background: rgba(0,0,0,0);
                width: 80px;
                height: 100%;
                font-size: 16px;
                color: #000;
                text-align: center;
                border: none;
                border-radius: 0px;
                outline: unset;
              }
              option{
                color: black;
                background: #A6E1EC;
                line-height: 20px;
                border-radius: 0;
              }
              option:hover{
                  background: #EBCCD1;
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
}</style>
