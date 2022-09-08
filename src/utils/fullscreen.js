/**
 * 请求全屏
 * @param {Element} element 要全屏显示的元素，默认为 HTML 根元素
 */
export function requestFullscreen(element = document.documentElement) {
  if (!document.fullscreenEnabled) {
    console.warn("当前浏览器不支持全屏模式或全屏特性不被允许");
    return;
  }

  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    return element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    return element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    return element.msRequestFullscreen();
  }
}

/**
 * 退出全屏
 */
export function exitFullscreen() {
  if (!document.fullscreenElement) {
    console.warn("当前浏览器未处于全屏模式");
    return;
  }

  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    return document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    return document.msExitFullscreen();
  }
}
