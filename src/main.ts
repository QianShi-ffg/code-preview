import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Router from "./router/index";

import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// @ts-ignore: worker
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (["css", "scss", "less"].includes(label)) {
      return new cssWorker();
    }
    if (["html", "handlebars", "razor"].includes(label)) {
      return new htmlWorker();
    }
    if (["typescript", "javascript"].includes(label)) {
      return new tsWorker();
    }
    return new EditorWorker();
  },
};
// 注册icon
const app: any = createApp(App);

// for (const [key, component] of Object.entries(kitsIcon)) {
//   app.component(key, component);
// }
// app.config.globalProperties.contextmenu = (event, menus) => {
//   menusEvent(event, menus);
// };
// app.config.globalProperties.$message = kitsIcon.message;
app.use(Router);
// 注册组件
// app.use(kitsUI);
app.mount("#app");
