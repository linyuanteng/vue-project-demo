import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { camelCase } from "lodash";
import { LocalStorage } from "@/utils/storage";

Vue.use(Vuex);

// 自动导入 modules 目录下所有模块的内容
const context = require.context("./modules", true, /\.store$/);
const modules = context.keys().reduce((result, key) => {
  /*
    模块名使用驼峰命名法，如：
    xxx.store.js 对应的模块名为 xxx
    xxx-yyy.store.js 对应的模块名为 xxxYyy
   */
  const moduleName = camelCase(key).replace("Store", "");
  const moduleContent = context(key);
  result[moduleName] = moduleContent.default || moduleContent;
  return result;
}, {});

export default new Vuex.Store({
  modules: modules,
  plugins: [
    // 状态持久化插件
    createPersistedState({
      storage: new LocalStorage(),
    }),
  ],
});
