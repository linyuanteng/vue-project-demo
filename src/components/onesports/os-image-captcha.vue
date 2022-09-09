<template>
  <el-image
    class="image-captcha"
    :class="className"
    :src="imageData"
    @click="handleClick"
  >
    <div
      slot="error"
      class="image-slot flex-row flex-center"
      @click="handleClick"
    >
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>

<script>
import { debounce } from "lodash";

export default {
  name: "OsImageCaptcha",

  props: {
    // 类名
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 图片验证码数据
      imageData: "",
    };
  },

  mounted() {
    // 渲染完成后获取图片验证码
    this.getImageData();
  },

  methods: {
    /**
     * 图片验证码点击事件
     */
    handleClick: debounce(function () {
      // 点击刷新图片验证码
      this.getImageData();
    }, 300),
    /**
     * 获取图片验证码
     */
    getImageData() {
      // TODO: 调用接口获取图片验证码
    },
  },
};
</script>

<style lang="scss" scoped>
.image-captcha {
  @include size(64px, 32px);
  background: $color-background;

  :deep(.image-slot) {
    height: 100%;
  }
}
</style>
