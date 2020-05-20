import React from 'react';
import 'antd/dist/antd.css';
import './PendingReceipt.css';
import cookie from 'react-cookies';
import { Tabs, message, Form, Rate, Button, Modal, Select, Input } from 'antd';
const desc = ['一星', '两星', '三星', '四星', '五星'];
const { TextArea } = Input;
class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            score: 5,
            comment: '',
            order: [],

        }

        this.sendCommentClick = this.sendCommentClick.bind(this);

    }


    sendCommentClick() {
        const score = this.state.score;
        const comment = this.state.comment;
        this.props.put(score,comment,this.state.order);

    }

    commentChange = (rule, value, callback) => {
        if (value) {

            if (value.length < 10 || value.length > 50) {
                callback("评论长度在10-50之间！");
                this.setState({
                    comment: ''
                })
            }
            else {
                this.setState({
                    comment: value
                })
                callback();
            }

        }
        else {
            this.setState({
                comment: ''
            })
            callback();
        }
    }

    rateChange = (value) => {

        if (value == 0) {
            message.info("请至少打一星哟！");
            this.setState({
                score: '',
            })
        }
        else {
            this.setState({
                score: value,
            })
        }

        // alert(value);
    }






    componentDidMount() {

        const orderInfo = this.props.item;


        this.setState({
            order: orderInfo,
        })

    }




    render() {


        const { getFieldDecorator } = this.props.form;
        const { score } = this.state;

        return (

            <div >
                <Form labelCol={{ span: 7 }} wrapperCol={{ span: 10 }} onSubmit={this.handleSubmit} >
                    <Form.Item
                        label="评论"
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入评论内容！' }, {
                                validator: this.commentChange,
                            }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </Form.Item>
                    <Form.Item label="评分">

                        <Rate tooltips={desc} onChange={this.rateChange} value={score} />

                    </Form.Item>
                    <Form.Item
                        style={{ marginLeft: '20%' }}
                    >
                        <Button type="primary" htmlType="submit" onClick={this.sendCommentClick}>
                            发表评论
                                </Button>
                    </Form.Item>

                </Form>
            </div>

        )

    }


}


const CommentForm = Form.create()(Comment);
export default CommentForm;