<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :class="className"
    :style="iconStyle"
  >
    <use :xlink:href="iconURL" />
  </svg>
</template>

<script>
export default {
  name: "OsSvgIcon",

  props: {
    // 图标名称
    name: {
      type: String,
      required: true,
    },
    // 图标类名
    className: {
      type: String,
      default: "",
    },
    // 图标宽度
    width: {
      type: String,
      default: "",
    },
    // 图标高度
    height: {
      type: String,
      default: "",
    },
    // 图标颜色
    color: {
      type: String,
      default: "",
    },
  },

  computed: {
    // 图标样式
    iconStyle() {
      const styles = [];
      if (this.width) styles.push(`width: ${this.width}`);
      if (this.height) styles.push(`height: ${this.height}`);
      if (this.color) styles.push(`color: ${this.color}`);
      return styles.join(";");
    },
    // 图标路径
    iconURL() {
      return `#icon-${this.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
  color: $color-primary;
  fill: currentColor;
}
</style>
