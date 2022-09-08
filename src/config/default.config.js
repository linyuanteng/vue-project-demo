const Environment = require("./environment");

module.exports = {
  /****************************** 环境配置 ******************************/
  // 运行环境
  environment: Environment.DEVELOPMENT,

  /****************************** 应用配置 ******************************/
  // 系统名称
  systemName: "Vue Project Demo",
  // 系统代码
  systemCode: "VUE_PROJECT_DEMO",
  // 主题
  theme: "default",

  /****************************** 请求配置 ******************************/
  // 阿里云 OSS 地址
  ossURL: "",
  // 接口文档地址
  apiDocumentURL: "",
  // 请求地址
  requestBaseURL: "",
  // 超时时间
  timeout: 10000,
  // 响应代码
  responseCodes: {},

  /****************************** 功能配置 ******************************/
  // 是否使用图片验证码
  useImageCaptcha: false,
  // 是否使用滑块验证码
  useSlideCaptcha: false,
  // 是否使用路由配置作为侧边栏菜单
  useRoutesAsMenu: true,
  // 是否显示顶部标签栏
  showsHeaderTabs: true,
  // 是否显示表头筛选按钮
  showsTableFilter: false,
  // 是否需要校验登录状态
  shouldCheckLogin: false,
  // 是否需要校验用户权限
  shouldCheckPermission: false,
};
