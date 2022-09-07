import { typeOf } from "./type";
import { AES } from "./crypto";

const aes = new AES();

/**
 * LocalStorage 工具类
 */
export class LocalStorage {
  /**
   * 获取 localStorage 中指定键名对应的值，不存在时返回 null
   * @param {string} key 键名
   * @returns {string|object} 值
   */
  getItem(key) {
    if (typeOf(key) !== "string") return null;

    const value = localStorage.getItem(aes.encrypt(key));
    return aes.decrypt(value) || value;
  }

  /**
   * 设置 localStorage 中的键值对
   * @param {string} key 键名
   * @param {*} value 值
   */
  setItem(key, value) {
    if (typeOf(key) !== "string") return;

    localStorage.setItem(aes.encrypt(key), aes.encrypt(value));
  }

  /**
   * 移除 localStorage 中指定键名对应的键值对信息
   * @param {string} key 键名
   */
  removeItem(key) {
    if (typeOf(key) !== "string") return;

    localStorage.removeItem(aes.encrypt(key));
  }

  /**
   * 清空 localStorage 中所有键值对信息
   */
  clear() {
    localStorage.clear();
  }
}

/**
 * SessionStorage 工具类
 */
export class SessionStorage {
  /**
   * 获取 sessionStorage 中指定键名对应的值，不存在时返回 null
   * @param {string} key 键名
   * @returns 值
   */
  getItem(key) {
    if (typeOf(key) !== "string") return null;

    const value = sessionStorage.getItem(aes.encrypt(key));
    return aes.decrypt(value) || value;
  }

  /**
   * 设置 sessionStorage 中的键值对
   * @param {string} key 键名
   * @param {*} value 值
   */
  setItem(key, value) {
    if (typeOf(key) !== "string") return;

    sessionStorage.setItem(aes.encrypt(key), aes.encrypt(value));
  }

  /**
   * 移除 sessionStorage 中指定键名对应的键值对信息
   * @param {string} key 键名
   */
  removeItem(key) {
    if (typeOf(key) !== "string") return;

    sessionStorage.removeItem(aes.encrypt(key));
  }

  /**
   * 清空 sessionStorage 中所有键值对信息
   */
  clear() {
    sessionStorage.clear();
  }
}

/**
 * Cookie 工具类
 */
export class Cookie {
  /**
   * 获取 cookie 中指定键名对应的值，不存在时返回 null
   * @param {string} key 键名
   * @returns 值
   */
  getItem(key) {
    if (typeOf(key) !== "string") return null;

    const value = this.#getAllCookies()[aes.encrypt(key)];
    return aes.decrypt(value) || value;
  }

  /**
   * 设置 cookie 中的键值对
   * @param {string} key 键名
   * @param {*} value 值
   * @param expires 过期时间
   */
  setItem(key, value, expires) {
    if (typeOf(key) !== "string") return;

    const data = [
      `${aes.encrypt(key)}=${aes.encrypt(value)}`,
      `expires=${expires ? expires.toUTCString() : null}`,
      "path=/",
    ];
    document.cookie = data.join(";");
  }

  /**
   * 移除 cookie 中指定键名对应的键值对信息
   * @param {string} key 键名
   */
  removeItem(key) {
    if (typeOf(key) !== "string") return;

    this.setItem(key, "", new Date());
  }

  /**
   * 清空 cookie 中所有键值对信息
   */
  clear() {
    Object.keys(this.#getAllCookies()).forEach((key) => {
      this.removeItem(aes.decrypt(key));
    });
  }

  /**
   * 获取所有的 cookie 键值对
   * @returns cookie
   */
  #getAllCookies() {
    return document.cookie
      .split(";")
      .map((item) => item.trim().split("="))
      .reduce((result, item) => {
        result[item[0]] = item[1];
        return result;
      }, {});
  }
}
