// 配置信息
const config = require("./src/config");

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // 自动导入全局 scss 文件，动态导入主题 scss 文件
        prependData: `
          @import "~@/assets/styles/index.scss";
          @import "~@/assets/themes/${config.theme}/styles/index.scss";
        `,
      },
    },
  },
};
