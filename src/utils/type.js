/**
 * 获取某个值的类型
 * @param {*} value 值
 * @returns {string} 类型
 */
export function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
