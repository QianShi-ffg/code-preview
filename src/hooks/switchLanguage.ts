import * as sass from "sass";
import { ref, onMounted, computed } from 'vue';

export default function useSwitchLanguage() {
  const switchCss = (cssSelectVal: string, value: string) => {
      if (cssSelectVal === "scss") {
          try {
              const result = sass.compileString(value);
              return { css: result.css, error: null };
          } catch (error: any) {
              console.log("Sass compilation error:", error);
            //   alert(`${cssSelectVal}有语法错误`);
              return { css: "", error: error?.message };
          }
      } else if (cssSelectVal === "css") {
          return { css: value, error: null };
      }
  };
  return {
    switchCss
  };  
}