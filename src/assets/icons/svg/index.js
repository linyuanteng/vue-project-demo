// 自动导入统计目录下所有的 svg 图标
const context = require.context("./", true, /\.svg$/);
context.keys().forEach(context);
