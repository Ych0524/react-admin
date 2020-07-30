import React, {Fragment} from 'react';
/*
*css
* */
import './index.scss'

/*
* 组件
* */
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  /*message*/} from 'antd';
import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,} from '@ant-design/icons';
import { vailDate_password, vailDate_email } from "../../utils/vaildate";
import { Login, GetCode } from "../../api/account";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      code_button_disabled: true, //按钮禁用
      code_button_loading: false, //按钮加载
      code_button_text: '获取验证码' //按钮文本
    }
  }

  toggleForm = () => {
    this.props.switchForm('register')
  }

  inputChange = e => {
    this.setState({
      username: e.target.value
    })
  }
  /*倒计时*/
  countCode = () => {
    let timer = null
    let sum = 5
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sum}s`
    })
    timer = setInterval(() => {
      sum--
      this.setState({
        code_button_text: `${sum}s`
      })
      if (sum === 0) {
        this.setState({
          code_button_text: `重新获取`,
          code_button_disabled: false,
        })
        clearInterval(timer)
      }
    },1000)
  }
  /*登录*/
  onFinish = values => {
    Login().then(res => {
      console.log(res)
    })
    console.log('Received values of form: ', values);
  };
  /*获取验证码*/
  codeClick = () => {
    this.setState({
      code_button_loading: true,
      code_button_text: '发送中'
    })
    let data = {
      username: this.state.username,
      module: 'login'
    }
    GetCode(data).then(res => {
      console.log(res)
      this.countCode()
    }).catch(err => {
      this.setState({
        code_button_loading: false,
        code_button_text: '重新获取'
      })
    })
  }

  render() {
    const that = this
    return (
        <Fragment>
          <div className="form-header">
            <h4 className="column">登录</h4>
            <span onClick={this.toggleForm}>账号注册</span>
          </div>
          <div className="form-content">
            <Form name="normal_login"
                  className="login-form"
                  initialValues={{remember: true}}
                  onFinish={this.onFinish}>
              <Form.Item name="email"
                         rules={[{required: true, message: '请输入您的邮箱!'},
                           ({ getFieldValue }) => ({
                             validator(rule, value) {
                               if (vailDate_email(value)) {
                                 that.setState({
                                   code_button_disabled: false
                                 })
                                 return Promise.resolve()
                               } else {
                                 that.setState({
                                   code_button_disabled: true
                                 })
                               }
                               return Promise.reject('邮箱格式不正确!')
                             }
                           })]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="Email"
                       value={this.state.username} onChange={this.inputChange}/>
              </Form.Item>
              <Form.Item name="password"
                         rules={[{required: true, message: '请输入您的密码!'},
                           {min: 6, message: '密码不能小于6位数!'},
                           {max: 18, message: '密码不能大于20位数!'},
                           {pattern: vailDate_password, message: '密码长度在6~18之间!'}]}>
                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password"
                       placeholder="密码"/>
              </Form.Item>
              <Form.Item name="code"
                         rules={[{required: true, message: '请输入验证码!'},
                           {len: 6, message: '请输入6位数的验证码!'}]}>
                <Row gutter={13}>
                  <Col span={15}>
                    <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon"/>}
                           placeholder="验证码"/>
                  </Col>
                  <Col span={9}>
                    <Button type="danger"
                            block
                            onClick={this.codeClick}
                            disabled={this.state.code_button_disabled}
                            loading={this.state.code_button_loading}>{this.state.code_button_text}</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block>登录</Button>
              </Form.Item>
            </Form>
          </div>
        </Fragment>
    )
  }
}

export default LoginForm