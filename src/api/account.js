import instance from '../../src/utils/request'

/*
* 登录接口
* */
export function Login(data) {
  return instance.request({
    url: '/login/',
    method: 'post',
    data, // post
    //params: data //get
  })
}

/*
* 获取验证码
* */
export function GetCode(data) {
  return instance.request({
    url: '/getSms/',
    method: 'post',
    data, // post
  })
}