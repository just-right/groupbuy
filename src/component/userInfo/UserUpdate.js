import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message
} from 'antd';
import 'antd/dist/antd.css';
import './UserInfo.css';
import { Redirect } from 'react-router-dom';
const Option = Select.Option;


const residences = [{
    value: '北京市',
    label: '北京市',
    children: [{
        value: '昌平区',
        label: '昌平区'
    },
    {
        value: '朝阳区',
        label: '朝阳区'
    }],
}, {
    value: '重庆市',
    label: '重庆市',
    children: [{
        value: '江津区',
        label: '江津区'
    },
    {
        value: '渝北区',
        label: '渝北区'
    }],
}];



class UserUpdate extends React.Component {

    state = {
        confirmDirty: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            accountpassword: '',
            checkpassword: '',
            username: '',
            sex: '',
            address: '',
            telephonenumber: '',
            user: [],
            addresspre: '',
            addressend: '',

        };
        this.changeClick = this.changeClick.bind(this);
        this.sexHandleChange = this.sexHandleChange.bind(this);
        this.addressHandleChange = this.addressHandleChange.bind(this);
    }


    sexHandleChange(value) {
        this.setState({
            sex: value
        })
    }
    addressHandleChange(value) {
        this.setState({
            address: value
        })
    }


    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
            if (value !== form.getFieldValue('password')) {
                this.setState({
                    checkpassword: ''
                });
                callback('两次密码不一致！');
            } else {
                this.setState({
                    checkpassword: value
                });
                callback();
            }
        }
        else {
            this.setState({
                checkpassword: ''
            });
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
            if (value.length < 10 || value.length > 30) {
                this.setState({
                    accountpassword: ''
                });
                callback("密码长度在10-30之间！");
            }
            else {
                if (this.state.confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                this.setState({
                    accountpassword: value
                });
                callback();
            }
        }
        else {
            this.setState({
                accountpassword: ''
            });
            callback();
        }
    }

    validateAccountName = (rule, value, callback) => {

        if (value) {
            if (value.length < 6 || value.length > 20) {
                this.setState({
                    accountname: ''
                });
                callback("账号长度在6-20之间！");
            }
            else {
                const addUrl = '?accountname=' + value;
                fetch('/userservice/api/user/register/checkby/accountname' + addUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            this.setState({
                                accountname: ''
                            });
                            callback("用户名已存在！");
                        }
                        else {
                            this.setState({
                                accountname: value
                            });
                            callback();
                        }
                    })
            }
        }
        else {
            this.setState({
                accountname: ''
            });
            callback();
        }
    }

    validateTel = (rule, value, callback) => {
        if (value) {
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                this.setState({
                    telephonenumber: ''
                });
                callback("请输入正确格式的手机号！");
            }
            else {
                const addUrl = '?tel=' + value;
                fetch('/userservice/api/user/register/checkby/tel' + addUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            this.setState({
                                telephonenumber: ''
                            });
                            callback("电话号码已注册或未改变！");
                        }
                        else {
                            this.setState({
                                telephonenumber: value
                            });
                            callback();
                        }
                    })
            }
        }
        else {
            this.setState({
                telephonenumber: ''
            });
            callback();
        }

    }

    validateUserName = (rule, value, callback) => {
        if (value) {
            if (value.length < 6 || value.length > 20) {
                this.setState({
                    username: ''
                });
                callback("用户名长度在6-20之间！");
            }
            else {
                this.setState({
                    username: value
                });
                callback();
            }
        }
        else {
            this.setState({
                username: ''
            });
            callback();
        }
    }

    componentDidMount() {
        const id = this.props.id;
        fetch('/userservice/api/user/' + id + '/normal', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const pwd = data.data.accountPassword;
                    const username = data.data.userName;
                    const sex = data.data.sex;

                    const address = data.data.address;
                    const tel = data.data.telephoneNumber;
                    const addresspre = address.split(',')[0];
                    const addressend = address.split(',')[1];
                    this.setState({
                        user_id: id,
                        user: data.data,
                        accountpassword: pwd,
                        checkpassword: pwd,
                        username: username,
                        sex: sex,
                        address: address,
                        telephonenumber: tel,
                        addresspre: addresspre,
                        addressend: addressend,
                    })
                }

                else {
                    message.error("发生了一点错误！");
                }
            })


    }

    changeClick() {

        const password = this.state.accountpassword;
        const checkpassword = this.state.checkpassword;
        const username = this.state.username;
        const sex = this.state.sex;
        const address = this.state.address;
        const tel = this.state.telephonenumber;
        const id = this.state.user_id;



        if (password !== '' && checkpassword !== '' && checkpassword === password && username !== '' && tel !== '') {

            //是否能优化传递参数方式
            const addUrl = '?accountpassword=' + password + '&username=' + username + '&sex=' + sex + '&address=' + address + '&telephonenumber=' + tel;
            fetch('/userservice/api/user/' + id + '/update' + addUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("信息修改成功！");
                        // alert("注册成功！");
                        this.setState({
                            accountpassword: '',
                            checkpassword: '',
                            username: '',
                            sex: '',
                            // address: '',
                            telephonenumber: '',
                            // addresspre: '',
                            // addressend: '',
                        })
                        this.props.form.resetFields();
                    }
                    else {
                        message.error("信息修改失败！");
                        // alert("注册失败！");
                        this.setState({
                            accountpassword: '',
                            checkpassword: '',
                            username: '',
                            sex: '',
                            // address: '',
                            telephonenumber: '',
                            // addresspre: '',
                            // addressend: '',

                        })
                        this.props.form.resetFields();
                    }
                })
        }
        else {
            message.error("请完善相关信息！");
            // alert("请完善相关信息！");
        }
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        );



        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <div className="title">个人信息修改</div>

                <Form.Item
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        initialValue: this.state.accountpassword,
                        rules: [{
                            required: true, message: '请输入密码！',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        initialValue: this.state.checkpassword,
                        rules: [{
                            required: true, message: '请确认密码！',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    label={(
                        <span>
                            用户名&nbsp;
              <Tooltip title="用户名是不用于账号的哟！">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        initialValue: this.state.username,
                        rules: [{ required: true, message: '请输入用户名！', whitespace: true }, {
                            validator: this.validateUserName,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="性别">
                    {getFieldDecorator('sex', {
                        initialValue: this.state.sex,
                        rules: [{ required: true, message: '请选择性别', whitespace: true }],
                    })(
                        <Select  onChange={this.sexHandleChange} style={{ textAlign: 'center' }}>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>)}
                </Form.Item>

                {/* <Form.Item
                    label="地址"
                >
                    {getFieldDecorator('residence', {
                        initialValue: [this.state.addresspre, this.state.addressend],
                        rules: [{ type: 'array', required: false, message: '请选择你的地址' }],
                    })(
                        <Cascader allowClear={false} options={residences} onChange={this.addressHandleChange} />
                    )}
                </Form.Item> */}
                <Form.Item
                    label="电话号码"
                >
                    {getFieldDecorator('phone', {
                        initialValue: this.state.telephonenumber,
                        rules: [{ required: true, message: '请输入电话号码！' },
                        {
                            validator: this.validateTel,
                        }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} type="tel" name="tel" />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.changeClick}>确认修改</Button>
                </Form.Item>
            </Form >
        );
    }

}

const UserUpdateForm = Form.create()(UserUpdate);
export default UserUpdateForm;