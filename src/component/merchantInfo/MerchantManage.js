import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message
} from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import './MerchantManage.css';
import cookie from 'react-cookies';
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



class MerchantManage extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    constructor(props) {
        super(props);
        this.state = {
            merchantInfo: [],
            accountpassword: '',
            checkpassword: '',
            contactname: '',
            address: '',
            telephonenumber: '',
            addresspre: '',
            addressend: '',
        };
        this.changeClick = this.changeClick.bind(this);
        this.addressHandleChange = this.addressHandleChange.bind(this);
    }

    componentDidMount() {
        const merchant_id = cookie.load('merchantId');
        fetch('/userservice/api/merchant/' + merchant_id + '/normal', {
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
                    const contactname = data.data.store_ContactName;
              

                    const address = data.data.address;
                    const tel = data.data.telephoneNumber;
                    const addresspre = address.split(',')[0];
                    const addressend = address.split(',')[1];
                    this.setState({
                        merchantInfo: data.data,
                        accountpassword: pwd,
                        checkpassword: pwd,
                        contactname: contactname,
                        address: address,
                        telephonenumber: tel,
                        addresspre: addresspre,
                        addressend: addressend,
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });



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

            else if (value === this.state.merchantInfo.accountPassword) {
                this.setState({
                    accountpassword: ''
                });
                callback("密码未作修改！");
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
                            callback("电话号码已注册或与原号码相同！");
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



    validateContactName = (rule, value, callback) => {
        if (value) {
            if (value.length < 2 || value.length > 4) {
                this.setState({
                    contactname: ''
                });
                callback("联系人长度在2-4之间！");
            }
            else if (value === this.state.merchantInfo.store_ContactName) {
                callback("联系人未修改！");
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



    changeClick() {

        const password = this.state.accountpassword;
        const checkpassword = this.state.checkpassword;
        const contactname = this.state.contactname;
        const address = this.state.address;
        const tel = this.state.telephonenumber;
        const merchant_id = cookie.load('merchantId');
        if (address !== '' && password !== '' && checkpassword !== '' && checkpassword === password && contactname !== '' && tel !== '') {

            //是否能优化传递参数方式
            const addUrl = '?store_contactname=' + contactname + '&telephonenumber=' + tel + '&address=' + address + '&accountpassword=' + password;
            fetch('/userservice/api/merchant/' + merchant_id + '/update/' + addUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("个人信息修改成功！");
                        this.props.form.resetFields();
                        // alert("个人信息修改成功！");
                        this.setState({
                            merchantInfo: [],
                            accountpassword: '',
                            checkpassword: '',
                            contactname: '',
                            address: '',
                            telephonenumber: '',
                            addresspre: '',
                            addressend: '',

                        })


                    }
                    else {
                        message.error("个人信息修改失败！");

                        // alert("个人信息修改失败！");
                        this.setState({
                            merchantInfo: [],
                            accountpassword: '',
                            checkpassword: '',
                            contactname: '',
                            address: '',
                            telephonenumber: '',
                            addresspre: '',
                            addressend: '',
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
                <div className="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;个人信息修改</div>
                <Form.Item
                    label="修改密码"
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
                    label="修改联系人姓名"
                >
                    {getFieldDecorator('contactname', {
                        initialValue: this.state.contactname,
                        rules: [{ required: true, message: '请输入联系人！', whitespace: true }, {
                            validator: this.validateContactName,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="修改店铺地址"
                >
                    {getFieldDecorator('residence', {
                        initialValue: [this.state.addresspre, this.state.addressend],
                        // initialValue: ['重庆市', '江津区'],
                        rules: [{ type: 'array', required: false, message: '请选择你的地址' }],
                    })(
                        <Cascader allowClear={false} options={residences} onChange={this.addressHandleChange} />
                    )}
                </Form.Item>
                <Form.Item
                    label="修改电话号码"
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

const MerchantManageForm = Form.create()(MerchantManage);
export default MerchantManageForm;