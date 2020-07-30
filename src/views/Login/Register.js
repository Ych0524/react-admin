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
  Col } from 'antd';
import {LockOutlined, UserOutlined, SafetyCertificateOutlined} from '@ant-design/icons';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onFinish = values => {
    console.log('Received values of form: ', values);
  };
  toggleForm = () => {
    this.props.switchForm('login')
  }
  render() {
    return (
        <Fragment>
          <div className="form-header">
            <h4 className="column">注册</h4>
            <span onClick={this.toggleForm}>账号登录</span>
          </div>
          <div className="form-content">
            <Form name="normal_login"
                  className="login-form"
                  initialValues={{remember: true}}
                  onFinish={this.onFinish}>
              <Form.Item name="username"
                         rules={[{required: true, message: '请输入您的用户名!'}]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="用户名"/>
              </Form.Item>
              <Form.Item name="password"
                         rules={[{required: true, message: '请输入您的密码!'}]}>
                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password"
                       placeholder="密码"/>
              </Form.Item>
              <Form.Item name="passwords"
                         rules={[{required: true, message: '请重复输入您的密码!'}]}>
                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password"
                       placeholder="重复输入您的密码"/>
              </Form.Item>
              <Form.Item name="code"
                         rules={[{required: true, message: '请输入验证码!'}]}>
                <Row gutter={13}>
                  <Col span={15}>
                    <Input prefix={<SafetyCertificateOutlined className="site-form-item-icon"/>}
                           placeholder="验证码"/>
                  </Col>
                  <Col span={9}>
                    <Button type="danger"
                            block>获取验证码</Button>
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

export default Register