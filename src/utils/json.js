import { typeOf } from "./type";

/**
 * 判断某个值是否符合 JSON 格式
 * @param {*} value 判断内容
 * @returns {boolean} 判断结果
 */
export function isJSON(value) {
  try {
    const types = ["number", "string", "boolean", "object", "array", "null"];
    if (!types.includes(typeOf(value))) return false;

    switch (typeOf(value)) {
      case "object":
      case "array":
        JSON.stringify(value);
        break;
      case "string":
        JSON.parse(value);
        break;
    }
    return true;
  } catch (error) {
    return false;
  }
}
