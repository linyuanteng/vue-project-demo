// 默认配置
const defaultConfig = require("./default.config");
// 环境配置，根据当前运行环境自动导入
const environmentConfig = require(`./${defaultConfig.environment}.config`);

// 合并默认配置和环境配置，存在相同配置项时环境配置会覆盖默认配置
module.exports = {
  ...defaultConfig,
  ...environmentConfig,
};
