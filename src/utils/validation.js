import dayjs from "dayjs";

/**
 * 判断手机号格式是否正确
 * @param phoneNumber 手机号
 * @returns 判断结果
 */
export function isValidPhoneNumber(phoneNumber) {
  const regex = /^[1]([3-9])[0-9]{9}$/;
  return regex.test(phoneNumber);
}

/**
 * 判断密码格式是否正确
 * @param password 密码
 * @param rule 规则，可空
 * @returns 判断结果
 */
export function isValidPassword(password, rule) {
  // 默认密码规则为: 8-20 位, 必须同时包含大写字母、小写字母和数字
  const regex = rule || /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
  return regex.test(password);
}

/**
 * 判断身份证号格式是否正确
 * @param idCardNumber 身份证号
 * @returns 判断结果
 */
export function isValidIDCardNumber(idCardNumber) {
  // 判断是否为 18 位身份证号
  const formatRegex = /^[0-9]{17}[0-9Xx]$/;
  const isFormatValid = formatRegex.test(idCardNumber);
  if (!isFormatValid) return false;

  // 判断前两位是否合法的省份代码
  const prefixRegex = /[1-68]1|[1-68][23]|[13-6]4|[1346]5|[34]6|37|50/;
  const prefix = idCardNumber.substring(0, 2);
  const isPrefixValid = prefixRegex.test(prefix);
  if (!isPrefixValid) return false;

  // 判断出生日期是否合法
  const birthday = idCardNumber.substring(6, 14);
  if (dayjs(birthday).isAfter(dayjs())) return false;
  const format = "YYYYMMDD";
  const isBirthdayValid = dayjs(birthday, format).format(format) === birthday;
  if (!isBirthdayValid) return false;

  // 判断校验位是否合法
  const integers = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const characters = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  const sum = idCardNumber
    .substring(0, 17)
    .split("")
    .reduce((result, character, index) => {
      return result + Number(character) * integers[index];
    }, 0);
  const isSuffixValid = idCardNumber
    .toUpperCase()
    .endsWith(characters[sum % 11]);
  if (!isSuffixValid) return false;

  return true;
}
