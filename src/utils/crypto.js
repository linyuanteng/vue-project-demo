import CryptoJS from "crypto-js";
import { typeOf } from "./type";
import { isJSON } from "./json";

// MD5 加密

/**
 * MD5 加密
 * @param {*} message 明文
 * @returns {string} 密文
 */
export function md5(message) {
  const types = ["number", "string", "boolean"];
  if (!types.includes(typeOf(message))) return message;

  return CryptoJS.MD5(`${message}`).toString();
}

// AES 加密

// AES 加密默认配置
const DEFAULT_AES_MODE = CryptoJS.mode.CBC;
const DEFAULT_AES_PADDING = CryptoJS.pad.Pkcs7;
const DEFAULT_AES_KEY = CryptoJS.enc.Utf8.parse("3WER4Z2LTD79YA28");
const DEFAULT_AES_IV = CryptoJS.enc.Utf8.parse("A7LR7SEJ3PZV1WF9");

/**
 * AES 加密
 */
export class AES {
  #options;

  constructor(options = {}) {
    this.#options = {
      mode: options.mode || DEFAULT_AES_MODE,
      padding: options.padding || DEFAULT_AES_PADDING,
      key: options.key || DEFAULT_AES_KEY,
      iv: options.iv || DEFAULT_AES_IV,
    };
  }

  /**
   * 加密
   * @param {*} plaintext 明文
   * @returns {string} 密文
   */
  encrypt(plaintext) {
    const string = isJSON(plaintext) ? JSON.stringify(plaintext) : plaintext;
    const encryptedData = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(string),
      this.#options.key,
      this.#options
    );
    return encryptedData.ciphertext.toString().toLowerCase();
  }

  /**
   * 解密
   * @param {string} ciphertext 密文
   * @returns {string} 明文
   */
  decrypt(ciphertext) {
    if (typeof ciphertext !== "string") return ciphertext;

    const encryptedData = CryptoJS.enc.Hex.parse(ciphertext);
    const decryptedData = CryptoJS.AES.decrypt(
      CryptoJS.enc.Base64.stringify(encryptedData),
      this.#options.key,
      this.#options
    );
    const plaintext = decryptedData.toString(CryptoJS.enc.Utf8).toString();
    return isJSON(plaintext) ? JSON.parse(plaintext) : plaintext;
  }
}
