// 自动导入同级目录下所有混入的内容
const { camelCase } = require("lodash");
const context = require.context("./", true, /\.mixin$/);
const mixins = context.keys().reduce((result, item) => {
  /*
    模块名使用驼峰命名法，如：
    xxx.mixin.js 对应的模块名为 xxxMixin
    xxx-yyy.mixin.js 对应的模块名为 xxxYyyMixin
    在需要使用的组件中，使用以下格式导入即可：
    import { xxxMixin } from "@/mixins";
   */
  const moduleName = camelCase(item);
  const moduleContent = context(item);
  result[moduleName] = moduleContent.default || moduleContent;
  return result;
}, {});

module.exports = mixins;
