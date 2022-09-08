import Vue from "vue";

class EventBusPlugin {}

const _eventBus = new Vue();

EventBusPlugin.install = function (Vue) {
  Vue.eventBus = _eventBus;
  window.eventBus = _eventBus;
  Object.defineProperties(Vue.prototype, {
    eventBus: {
      get() {
        return _eventBus;
      },
    },
    $eventBus: {
      get() {
        return _eventBus;
      },
    },
  });
};

Vue.use(EventBusPlugin);

export default EventBusPlugin;
