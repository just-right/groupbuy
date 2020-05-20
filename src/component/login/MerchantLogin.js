import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import 'antd/dist/antd.css';
import './MerchantLogin.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
class MerchantLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checkboxState: true,
      registerFlag: false,
      loginSuccessFlag: false
    }
    this.loginOnClick = this.loginOnClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  componentDidMount() {
    if (cookie.load('merchantId')) {
      // alert("登录成功");
      this.setState({
        loginSuccessFlag: true
      });
    }
  }

  registerClick() {
    this.setState({
      registerFlag: true
    })
  }

  loginOnClick() {
    //TODO 向后台发送登录验证请求
    const name = this.state.username;
    const password = this.state.password;

    if (name !== '' && password !== '') {
      //是否能优化传递参数方式
      const addUrl = '?accountname=' + this.state.username + '&accountpassword=' + this.state.password;
      fetch('/userservice/api/merchant/login/' + addUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {

          if (data.code === 200) {
            // if (this.state.checkboxState) {
            cookie.save('merchantId', data.data.merchant_id, { path: '/' });
            cookie.save('merchantName', data.data.accountname, { path: '/' });
            cookie.save('merchantPassword', data.data.accountpassword, { path: '/' });
            // }
            message.success("登录成功！");
            // alert("登录成功！");
            this.setState({
              loginSuccessFlag: true
            });
          }
          else if (data.msg === "not approve") {
            message.error("注册审核中！");
            // alert("注册审核中！");
          }
          else if (data.msg === "banned") {
            message.error("您已被封禁！");
            // alert("您已被封禁！");
          }
          else {
            message.error("账号或密码错误！");
            // alert("账号或密码错误！");
          }
        })
    }
  }


  render() {
    if (this.state.registerFlag) {
      return <Redirect to='/register'></Redirect>
    }
    else if (this.state.loginSuccessFlag) {
      return <Redirect to='/index'></Redirect>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="title">商家登录</div>
        <Form.Item>
          {getFieldDecorator('账号', {
            rules: [{ required: true, message: '请输入账号！' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" onChange={e => {
              this.setState({
                username: e.target.value
              })
            }} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('密码', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" onChange={e => {
              this.setState({
                password: e.target.value
              })
            }} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: this.state.checkboxState,
          })(
            <Checkbox onChange={e => {
              const tmpState = this.state.checkboxState === true ? false : true;
              this.setState({
                checkboxState: tmpState
              })
            }}>记住我</Checkbox>
          )}
          <a className="login-form-forgot" onClick={this.registerClick}>没有账号？立即注册！</a>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.loginOnClick}>
            登录
            </Button>
        </Form.Item>
      </Form>

    )
  }
}

const MerchantLoginForm = Form.create()(MerchantLogin);
export default MerchantLoginForm;