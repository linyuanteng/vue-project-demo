import { typeOf } from "@/utils/type";

export default {
  data() {
    return {
      eventBusList: [],
    };
  },

  created() {
    // 设置事件监听
    const list = this.setupEventBus();
    if (typeOf(list) !== "array") {
      console.warn("setupEventBus 必须返回一个数组");
    } else if (!list.every((item) => item.event && item.callback)) {
      const format = "{ event: string, callback: function }";
      console.warn(`setupEventBus 返回的数组中元素的格式必须是 ${format}`);
    } else {
      list.forEach((item) => {
        this.$eventBus.$on(item.event, item.callback);
        this.eventBusList.push(item.event);
      });
    }
  },

  destroyed() {
    // 取消事件监听
    this.eventBusList.forEach((item) => {
      this.$eventBus.$off(item);
    });
    this.eventBusList = [];
  },

  methods: {
    /**
     * 设置 event bus
     * @returns {array} event bus 列表
     */
    setupEventBus() {
      return [];
    },
  },
};
