import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message
} from 'antd';
import 'antd/dist/antd.css';
import './UserInfo.css';
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



class AddressUpdate extends React.Component {

    state = {
        confirmDirty: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            address_id: '',
            contactName: '',
            address: '',
            telephonenumber: '',
            addressInfo: [],
            addresspre: '',
            addressend: ''
        };
        this.changeClick = this.changeClick.bind(this);
        this.addressHandleChange = this.addressHandleChange.bind(this);
    }

    componentWillMount() {

        const addressInfo = this.props.address;
        const id = addressInfo.address_ID;
        const address = addressInfo.address;
        const addresspre = address.split(',')[0];
        const addressend = address.split(',')[1];
        const tel = addressInfo.telephoneNumber;
        const name = addressInfo.receipt_Contacts;

        // alert(address);

        this.setState({
            address_id: id,
            addressInfo: addressInfo,
            address: address,
            contactName: name,
            telephonenumber: tel,
            addresspre: addresspre,
            addressend: addressend
        })
    }



    addressHandleChange(value) {

        
        const address = this.state.address;
        // message.info(address);
        if (value != address) {
            message.info("所选地址范围需要和用户注册地址[" + address + "]一致！");
            this.setState({
                address: address
            })
        }
        else {
            this.setState({
                address: value
            })
        }
    }


    // handleConfirmBlur = (e) => {
    //     const value = e.target.value;
    //     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // }


    validateTel = (rule, value, callback) => {
        if (value) {
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                this.setState({
                    telephonenumber: ''
                });
                callback("请输入正确格式的手机号！");
            }
            else {

                this.setState({
                    telephonenumber: value
                });
                callback();

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
            if (value.length < 2 || value.length > 10) {
                this.setState({
                    contactName: ''
                });
                callback("联系人长度在2-10之间！");
            }
            else {
                this.setState({
                    contactName: value
                });
                callback();
            }
        }
        else {
            this.setState({
                contactName: ''
            });
            callback();
        }
    }



    changeClick() {
        const contactName = this.state.contactName;
        const address = this.state.address;
        const tel = this.state.telephonenumber;
        const id = this.state.address_id;


        if (contactName !== '' && address !== '' && tel !== '' && id !== '') {

            //是否能优化传递参数方式
            const addUrl = '?address=' + address + '&telephonenumber=' + tel + '&receipt_contacts=' + contactName;
            fetch('/userservice/api/shippingaddress/' + id + '/update' + addUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("修改收货地址成功！");
                        // alert("注册成功！");
                        this.setState({
                            contactName: '',
                            address: '',
                            telephonenumber: '',
                            addresspre: '',
                            addressend: ''
                        })
                        this.props.form.resetFields();
                    }
                    else {
                        message.error("修改收货地址失败！");
                        // alert("注册失败！");
                        this.setState({
                            contactName: '',
                            address: '',
                            telephonenumber: '',
                            addresspre: '',
                            addressend: ''
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
                <div className="title">修改收货地址</div>


                <Form.Item
                    label={(
                        <span>
                            联系人&nbsp;

                        </span>
                    )}
                >
                    {getFieldDecorator('contactname', {
                        initialValue: this.state.contactName,
                        rules: [{ required: true, message: '请输入联系人！', whitespace: true }, {
                            validator: this.validateContactName,
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>



                <Form.Item
                    label="地址"
                >
                    {getFieldDecorator('residence', {
                        initialValue: [this.state.addresspre, this.state.addressend],
                        rules: [{ type: 'array', required: false, message: '请选择你的地址' }],
                    })(
                        <Cascader allowClear={false} options={residences} onChange={this.addressHandleChange} />
                    )}
                </Form.Item>
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

const AddressUpdateForm = Form.create()(AddressUpdate);
export default AddressUpdateForm;