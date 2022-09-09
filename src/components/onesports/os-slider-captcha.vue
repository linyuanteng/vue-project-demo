<template>
  <verify
    ref="verify"
    captcha-type="blockPuzzle"
    :base-url="baseURL"
    @successCallBack="$emit('success', $event)"
  >
  </verify>
</template>

<script>
import Verify from "public-captcha";
import config from "@/config";

export default {
  name: "OsSliderCaptcha",

  components: {
    Verify,
  },

  data() {
    const isProduction = process.env.NODE_ENV === "production";
    return {
      baseURL: isProduction ? config.requestBaseURL : "/apis",
    };
  },

  methods: {
    /**
     * 打开滑块验证码弹窗
     */
    show() {
      this.$refs.verify.show();
    },
  },
};
</script>
