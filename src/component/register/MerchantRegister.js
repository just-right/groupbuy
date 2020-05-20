import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message
} from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import './MerchantRegister.css';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

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



class MerchantRegister extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    constructor(props) {
        super(props);
        this.state = {
            accountname: '',
            accountpassword: '',
            checkpassword: '',
            storename: '',
            contactname: '',
            address: '重庆市,江津区',
            telephonenumber: '',
            propcheck: true,
            loginFlag: false
        };
        this.registerClick = this.registerClick.bind(this);
        this.addressHandleChange = this.addressHandleChange.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    loginClick() {
        this.setState({
            loginFlag: true
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
                fetch('/userservice/api/merchant/register/checkby/accountname' + addUrl, {
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
                            callback("账号已存在！");
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
                fetch('/userservice/api/merchant/register/checkby/tel' + addUrl, {
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
                            callback("电话号码已注册！");
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

    validateStoreName = (rule, value, callback) => {
        if (value) {
            if (value.length < 3 || value.length > 10) {
                this.setState({
                    storename: ''
                });
                callback("店铺名长度在3-10之间！");
            }
            else {
                const addUrl = '?storename=' + value;
                fetch('/userservice/api/merchant/register/checkby/storename' + addUrl, {
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
                                storename: ''
                            });
                            callback("店铺名已注册！");
                        }
                        else {
                            this.setState({
                                storename: value
                            });
                            callback();
                        }
                    })
            }
        }
        else {
            this.setState({
                storename: ''
            });
            callback();
        }
    }

    validateContactName = (rule, value, callback) => {
        if (value) {
            if (value.length < 2 || value.length > 4) {
                this.setState({
                    contactname: ''
                });
                callback("联系人长度在2-4之间！");
            }
            else {
                this.setState({
                    contactname: value
                });
                callback();
            }
        }
        else {
            this.setState({
                contactname: ''
            });
            callback();
        }
    }

    componentDidMount() {

    }

    registerClick() {
        const accountname = this.state.accountname;
        const password = this.state.accountpassword;
        const checkpassword = this.state.checkpassword;
        const storename = this.state.storename;
        const contactname = this.state.contactname;
        const address = this.state.address;
        const tel = this.state.telephonenumber;
        const propcheck = this.state.propcheck;

        if (accountname !== '' && password !== '' && checkpassword !== '' && checkpassword === password && storename !== '' && contactname !== '' && tel !== '' && propcheck === true) {

            //是否能优化传递参数方式
            const addUrl = '?accountname=' + accountname + '&accountpassword=' + password + '&store_name=' + storename + '&store_contactname=' + contactname + '&address=' + address + '&telephonenumber=' + tel;
            fetch('/userservice/api/merchant/register/' + addUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("注册成功！");
                        // alert("注册成功！");
                        this.setState({
                            accountname: '',
                            storename: '',
                            telephonenumber: '',
                            loginFlag: true
                        })


                    }
                    else {
                        message.error("注册失败！");
                        // alert("注册失败！");
                        this.setState({
                            accountname: '',
                            storename: '',
                            telephonenumber: ''
                        })
                    }
                })
        }
        else {
            message.error("请完善相关信息！");
            // alert("请完善相关信息！");
        }
    }

    render() {
        if (this.state.loginFlag) {
            return <Redirect to='/'></Redirect>
        }
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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
                <div className="title">商家注册</div>
                <Form.Item
                    label="账号"
                >
                    {getFieldDecorator('account', {
                        rules: [{
                            message: '请输入账号',
                        }, {
                            required: true, message: '请输入账号!',
                        }, {
                            validator: this.validateAccountName,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="密码"
                >
                    {getFieldDecorator('password', {
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
                    label="店铺名"
                >
                    {getFieldDecorator('storename', {
                        rules: [{ required: true, message: '请输入店铺名！', whitespace: true }, {
                            validator: this.validateStoreName,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="联系人姓名"
                >
                    {getFieldDecorator('contactname', {
                        rules: [{ required: true, message: '请输入联系人！', whitespace: true }, {
                            validator: this.validateContactName,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="店铺地址"
                >
                    {getFieldDecorator('residence', {
                        initialValue: ['重庆市', '江津区'],
                        rules: [{ type: 'array', required: false, message: '请选择你的地址' }],
                    })(
                        <Cascader  allowClear={false} options={residences} onChange={this.addressHandleChange} />
                    )}
                </Form.Item>
                <Form.Item
                    label="电话号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入电话号码！' },
                        {
                            validator: this.validateTel,
                        }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} type="tel" name="tel" />
                    )}
                </Form.Item>



                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        initialValue: this.state.propcheck
                    })(
                        <Checkbox onChange={e => {
                            const temStatus = this.state.propcheck === true ? false : true;
                            this.setState({
                                propcheck: temStatus
                            })
                        }}>我同意相关协议。</Checkbox>

                    )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.registerClick}>注册</Button>
                    &nbsp;&nbsp;&nbsp;<a onClick={this.loginClick}>已有账号？立即登录！</a>
                </Form.Item>
            </Form >
        );
    }

}

const MerchantRegisterForm = Form.create()(MerchantRegister);
export default MerchantRegisterForm;