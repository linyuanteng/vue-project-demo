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

  /***************************** 侧边栏配置 *****************************/
  // 是否显示侧边栏图标
  showsSidebarLogo: true,
  // 是否显示侧边栏标题
  showsSidebarTitle: true,
  // 是否显示折叠/展开图标
  showsSidebarCollapseIcon: true,
  // 是否显示侧边栏背景图片
  showsSidebarBackgroundImage: true,
  // 侧边栏背景色
  sidebarBackground: "#ffffff",
  // 侧边栏展开状态下宽度
  sidebarWidth: 256,
  // 侧边栏折叠状态下宽度
  sidebarCollapsedWidth: 56,
  // 侧边栏展开状态下 logo 高度
  sidebarLogoHeight: 96,
  // 侧边栏折叠状态下 logo 高度
  sidebarCollapsedLogoHeight: 32,
  // 侧边栏标题字体大小
  sidebarTitleFontSize: 20,
  // 侧边栏菜单项图标大小
  sidebarItemIconSize: 16,
  // 侧边栏菜单项样式，详见 variable.scss 中颜色变量部分
  sidebarItemStyle: "black",
  // 侧边栏菜单项选中状态背景色
  sidebarItemBackground: "#e8f2fe",

  /****************************** 功能配置 ******************************/
  // 是否使用图片验证码
  useImageCaptcha: false,
  // 是否使用滑块验证码
  useSliderCaptcha: false,
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
