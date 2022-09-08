// 自动导入同级目录下所有混入的内容
const context = require.context("./", true, /\.filter$/);
const filters = context.keys().reduce((result, item) => {
  /*
    在过滤器文件中，使用以下格式导出：
    export function filterName() {}
    在需要使用的组件中，使用以下格式导入即可：
    import { filterName } from "@/filters";
    自动导入会忽略 export default 和 module.exports 导出的内容
   */
  const module = context(item);
  const functions = Object.keys(module)
    .filter((key) => key !== "default")
    .reduce((result, item) => {
      result[item] = module[item];
      return result;
    }, {});
  return {
    ...result,
    ...functions,
  };
}, {});

module.exports = filters;
