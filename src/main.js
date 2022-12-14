import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";

// 全局导入所有 svg 图标
import "@/assets/icons/svg";
// 全局导入 element-ui 插件
import "./plugins/element.js";
// 全局导入 event bus 插件
import "@/utils/event-bus";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
