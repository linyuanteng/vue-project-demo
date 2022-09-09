const path = require("path");
const resolve = (dir) => path.join(__dirname, "./", dir);

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
  chainWebpack(config) {
    // 清除 svg 默认配置对 src/assets/icons 目录的处理
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    // 添加新的 rule 处理 src/assets/icons 目录下的 svg 文件
    config.module
      .rule("svg-icon")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },
};
