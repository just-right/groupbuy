import React from 'react';
import {
    Form, Table,message
} from 'antd';
import 'antd/dist/antd.css';
import './MerchantManage.css';
import cookie from 'react-cookies';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';




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



class MerchantInfo extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    constructor(props) {
        super(props);
        this.state = {
            merchantInfo: []
        };
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
                    this.setState({
                        merchantInfo: data.data,
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });

    }




    render() {

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

        return (
            <div>


                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                    <div className="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;个人信息</div>
                    <Form.Item
                        label="账号：" 
                    >
                        <span className="value">{this.state.merchantInfo.accountName}</span>
                    </Form.Item>
                    <Form.Item
                        label="店铺名：" 
                    >
                        <span className="value">{this.state.merchantInfo.store_Name}</span>
                    </Form.Item>
                    <Form.Item
                        label="店铺联系人：" 
                    >
                        <span className="value">{this.state.merchantInfo.store_ContactName}</span>
                    </Form.Item>
                    <Form.Item
                        label="联系电话：" 
                    >
                        <span className="value">{this.state.merchantInfo.telephoneNumber}</span>
                    </Form.Item>

                    <Form.Item
                        label="店铺地址：" 
                    >
                        <span className="value">{this.state.merchantInfo.address}</span>
                    </Form.Item>

                    <Form.Item
                        label="店铺等级：" 
                    >
                        <span className="value">{this.state.merchantInfo.accountLevel}</span>
                    </Form.Item>

                    <Form.Item
                        label="注册时间：" 
                    >
                        <span className="value">{moment(this.state.merchantInfo.registrationDate).format('YYYY-MM-DD')}</span>
                    </Form.Item>


                </Form >

            </div>
        );
    }

}

const MerchantInfoForm = Form.create()(MerchantInfo);
export default MerchantInfoForm;