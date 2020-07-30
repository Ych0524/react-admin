import React from 'react';
/*
*css
* */
import './index.scss'

/*
* 组件
* */
import LoginForm from "./LoginForm";
import Register from "./Register";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'login'
    }
  }
  switchForm = value => {
    this.setState({
      formType: value
    })
  }
  render() {
    return (
        <div className="form-wrap">
          <div>
            {this.state.formType === 'login' ?
                <LoginForm switchForm={this.switchForm}/>
                :
                <Register switchForm={this.switchForm}/>}
          </div>
        </div>
    )
  }
}

export default Login