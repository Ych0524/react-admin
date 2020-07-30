export const vailDate_password = /^[a-zA-Z]\w{5,17}$/

/*
* 验证邮箱正则
* */
const reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
export function vailDate_email(value) {
  return reg_email.test(value)
}