import React from 'react';

import {
    message, Form, Input, Button,
} from 'antd';

class BroadcastManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            broadcastMsg: ''
        }
        this.createClick = this.createClick.bind(this);

    }
    componentDidMount() {

    }






    createClick() {
        const broadcastMsg = this.state.broadcastMsg;

        if (broadcastMsg !== '') {
            
            const addUrl = '?msg=' + broadcastMsg;
            fetch('/userservice/api/administrator/send/broadcastmsg/' + addUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        message.success("广播消息发送成功！");
                    }
                    else {
                        message.error("广播消息发送失败！");
                    }

                    this.setState({
                        broadcastMsg: ''
                    });
                    this.props.form.resetFields();
                })

        }
        else {
            message.info("请完善相关信息！");
        }
    }


    validateBroadcastMsg = (rule, value, callback) => {
        if (value) {
            if(value.length>=3 && value.length<=20){
                this.setState({
                    broadcastMsg: value,
                })
                callback();
            }
            else{
                this.setState({
                    broadcastMsg: '',
                })
                callback("广播消息内容长度应在3-20之间！"); 
            }
        }
        else {
            this.setState({
                broadcastMsg: '',
            })
            callback();
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 5 }} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="广播消息"
                    >
                        {getFieldDecorator('broadcastMsg', {
                            rules: [{ required: true, message: '请输入广播消息名称！' }, {
                                validator: this.validateBroadcastMsg,
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>



                    <Form.Item
                        wrapperCol={{ span: 5, offset: 3 }}
                    >
                        <Button type="primary" htmlType="submit" onClick={this.createClick}>
                            发送广播
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        );
    }

}

const BroadcastManageForm = Form.create()(BroadcastManage);
export default BroadcastManageForm;
