<script>
import OsSvgIcon from "@/components/onesports/os-svg-icon.vue";
import config from "@/config";
import scssVariables from "@/assets/styles/variables.scss";
import { debounce } from "lodash";
import { eventBusMixin } from "@/mixins";
import {
  TOGGLE_SIDEBAR_STATE,
  ACTIVATE_MENU_ITEM,
  CLICK_MENU_ITEM,
} from "@/constants/event-bus-types";

export default {
  name: "AppSidebar",

  components: {
    OsSvgIcon,
  },

  mixins: [eventBusMixin],

  props: {
    // 菜单列表
    menu: {
      type: Array,
      required: true,
      validator: (value) => {
        const fn = (array) => {
          return array.every((item) => {
            let isSelfValid = true;
            if (!item.id) {
              console.warn(item, "菜单项 id 不能为空");
              isSelfValid = false;
            }
            if (!item.name) {
              console.warn(item, "菜单项 name 不能为空");
              isSelfValid = false;
            }
            if (![0, 1, 2].includes(item.type)) {
              console.warn(item, "菜单项 type 的值只能是 0/1/2 中的一个");
              isSelfValid = false;
            }

            let isChildrenValid = true;
            if (item.children && item.children.length > 0) {
              isChildrenValid = fn(item.children);
            }

            return isSelfValid && isChildrenValid;
          });
        };
        return fn(value);
      },
    },
  },

  data() {
    return {
      // 是否折叠
      isCollapsed: false,
      // 当前激活的菜单索引
      activatedIndex: null,
    };
  },

  computed: {
    // 样式
    style() {
      // 若显示背景图片，则背景色为透明，否则取配置中的背景色
      const background = config.showsSidebarBackgroundImage
        ? "transparent"
        : config.sidebarBackground;
      // 输出变量给 css 使用
      return `
          --width: ${config.sidebarWidth}px;
          --collapsed-width: ${config.sidebarCollapsedWidth}px;
          --background: ${background};
          --item-background: ${config.sidebarItemBackground};
        `;
    },
    // 文本颜色
    textColor() {
      // 取 variable.scss 中对应的颜色变量，若不存在则默认为黑色
      const key = `${config.sidebarItemStyle}Color`;
      return scssVariables[key] || scssVariables.blackColor;
    },
    // 是否显示 logo
    showsLogo() {
      return config.showsSidebarLogo;
    },
    // 是否显示标题
    showsTitle() {
      return config.showsSidebarTitle;
    },
    // 扁平菜单，即所有菜单及子菜单集合
    flattenMenu() {
      const fn = (array) => {
        return array.flatMap((item) => {
          const hasChildren = item.children && item.children.length > 0;
          return hasChildren ? [item, ...fn(item.children)] : [item];
        });
      };
      return fn(this.menu);
    },
  },

  methods: {
    /**
     * 菜单项点击事件
     */
    handleSelectMenuItem: debounce(function (index) {
      // 当前菜单项
      const from = this.getMenuItem(this.activatedIndex);
      // 点击的菜单项
      const to = this.getMenuItem(index);
      this.activateMenuItem(index);
      this.$eventBus.$emit(CLICK_MENU_ITEM, { from, to });
    }),
    /**
     * 设置 event bus
     */
    setupEventBus() {
      return [
        { event: TOGGLE_SIDEBAR_STATE, callback: this.toggleSidebarState },
        { event: ACTIVATE_MENU_ITEM, callback: this.activateMenuItem },
      ];
    },
    /**
     * 切换侧边栏折叠状态
     * @param {boolean} state 折叠状态
     */
    toggleSidebarState(state) {
      this.isCollapsed = !!state;
    },
    /**
     * 激活菜单项
     * @param {string} index 菜单索引
     */
    activateMenuItem(index) {
      this.activatedIndex = index;
    },
    /**
     * 根据菜单索引获取菜单信息
     * @param {string} index 菜单索引
     */
    getMenuItem(index) {
      return this.flattenMenu.find((item) => item.id === index);
    },
  },

  render() {
    const backgroundImage = () => {
      const backgroundImageURL = require(`@/assets/themes/${config.theme}/images/sidebar-background.png`);
      return <el-image class="background" src={backgroundImageURL}></el-image>;
    };
    const header = () => {
      return (
        <el-link class="header" href="#" style={this.style} underline={false}>
          {this.showsLogo && logo()}
          {this.showsTitle && title()}
        </el-link>
      );
    };
    const logo = () => {
      const imageURL = this.isCollapsed
        ? require(`@/assets/themes/${config.theme}/images/sidebar-logo.png`)
        : require(`@/assets/themes/${config.theme}/images/sidebar-logo-collapsed.png`);
      const logoHeight = this.isCollapsed
        ? config.sidebarCollapsedLogoHeight
        : config.sidebarLogoHeight;
      return (
        <el-image
          class="logo"
          style={`height: ${logoHeight}px;`}
          src={imageURL}
        ></el-image>
      );
    };
    const title = () => {
      const fontSize = this.isCollapsed ? 0 : config.sidebarTitleFontSize;
      return (
        <span
          id="sidebar-title"
          class="title"
          style={`font-size: ${fontSize}px; color: ${this.textColor}`}
        >
          {config.systemName}
        </span>
      );
    };
    const menu = () => {
      return (
        <el-menu
          class="menu"
          style={this.style}
          text-color={this.textColor}
          collapse={this.isCollapsed}
          default-active={this.activatedIndex}
          on-select={this.handleSelectMenuItem}
        >
          {menuContent(this.menu, true)}
        </el-menu>
      );
    };
    const submenu = (item) => {
      return (
        <el-submenu index={item.id}>
          <template slot="title">{menuItemContent(item)}</template>
          {menuContent(item.children || [])}
        </el-submenu>
      );
    };
    const menuItem = (item, isTopLevel) => {
      // 折叠状态下顶层菜单才显示文字提示，其余均不显示
      const showsTooltip = this.isCollapsed && isTopLevel;
      return (
        <el-tooltip
          placement="right"
          content={item.name}
          disabled={!showsTooltip}
        >
          <el-menu-item index={item.id}>{menuItemContent(item)}</el-menu-item>
        </el-tooltip>
      );
    };
    const menuContent = (menu, isTopLevel) => {
      return menu.map((item) => {
        return [submenu, menuItem][item.type](item, isTopLevel);
      });
    };
    const menuItemContent = (item) => {
      /*
        展开状态下，图标与文字间距 8px，折叠状态下，图标居中显示
        菜单项左右边距 20px，建议侧边栏折叠宽度设置为图标宽度 + 40px
       */
      const { sidebarCollapsedWidth, sidebarItemIconSize } = config;
      const margin = sidebarCollapsedWidth - sidebarItemIconSize - 40;
      const style = this.isCollapsed
        ? `margin: 0 ${margin / 2}px`
        : "margin-right: 8px;";
      const color =
        item.id === this.activatedIndex
          ? scssVariables.primaryColor
          : this.textColor;
      return (
        <div>
          <os-svg-icon
            name={item.icon}
            style={style}
            color={color}
            width={sidebarItemIconSize.toString()}
            height={sidebarItemIconSize.toString()}
          ></os-svg-icon>
          <span slot="title">{item.name}</span>
        </div>
      );
    };

    // 是否显示背景图片
    const showsBackgroundImage = config.showsSidebarBackgroundImage;
    // 是否显示顶部 logo 及标题
    const showsHeader = this.showsLogo || this.showsTitle;
    return (
      <div class="app-sidebar">
        {showsBackgroundImage && backgroundImage()}
        {showsHeader && header()}
        {menu()}
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.app-sidebar {
  @extend .flex-col;
  position: relative;
  border-right: 0.5px solid $color-line;

  .background {
    position: absolute;
    width: 100%;
  }
}
.header {
  padding: 8px;
  width: calc(100% - 16px);
  background: var(--background);

  :deep(.el-link--inner) {
    @extend .flex-col;
    @extend .flex-center;

    & :nth-child(2) {
      margin-top: 8px;
    }

    .logo {
      @extend .animated;
      height: var(--logo-height);
    }

    .title {
      @extend .animated;
      max-width: 80%;
      text-align: center;
      font-size: var(--font-size);
    }
  }
}

.menu {
  border-right: none;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--background);

  :deep(.el-menu) {
    background-color: transparent;
  }
  &:not(.el-menu--collapse) {
    width: var(--width);
  }
  &.el-menu--collapse {
    width: var(--collapsed-width);
  }

  :deep(.el-submenu__title:hover),
  :deep(.el-menu-item:hover),
  :deep(.el-menu-item.is-active) {
    background: var(--item-background);
  }
}
</style>
