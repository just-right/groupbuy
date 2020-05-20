import React from 'react';
import {
  message, Form, Icon, Input, Button, Checkbox,
} from 'antd';
import 'antd/dist/antd.css';
import './AdminLogin.css';
import cookie from 'react-cookies';

import { Redirect } from 'react-router-dom';

class AdminLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checkboxState: true,
      loginFlag: false
    }
    this.loginOnClick = this.loginOnClick.bind(this);


  }

  componentDidMount() {
    if (cookie.load('adminId')) {
      message.success("登录成功！");
      // alert("登录成功！");
      this.setState({
        loginFlag: true
      });

    }
  }

  loginOnClick() {

    //TODO 向后台发送登录验证请求
    const name = this.state.username;
    const password = this.state.password;

    if (name !== '' && password !== '') {
      //是否能优化传递参数方式
      const addUrl = '?accountname=' + this.state.username + '&accountpassword=' + this.state.password;
      fetch('/userservice/api/administrator/login' + addUrl, {
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
            cookie.save('adminId', data.data.administrator_ID, { path: '/' });
            cookie.save('adminName', data.data.accountName, { path: '/' });
            cookie.save('adminPassword', data.data.accountPassword, { path: '/' });
            // }
            message.success("登录成功！");
            // alert("登录成功！");
            this.setState({
              loginFlag: true
            });

          }
          else {
            message.error("账号或密码错误！");
            // alert("账号或密码错误！");
          }
        })
    }
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.loginFlag) {
      return <Redirect to='/index' />;
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="title">管理员登录</div>
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
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.loginOnClick}>
            登录
            </Button>
        </Form.Item>

      </Form>

    )
  }
}

const AdminLoginForm = Form.create()(AdminLogin);

export default AdminLoginForm;