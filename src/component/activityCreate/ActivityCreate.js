import React from 'react';
import { message, DatePicker } from 'antd';
import moment from 'moment';

import {
    Form, Input, Button,
} from 'antd';

const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;
class ActivityCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityName: '',
            activityIntroduction: '',
            beginDate: '',
            endDate: ''
        }
        this.createClick = this.createClick.bind(this);

    }
    componentDidMount() {

    }


    validateActivityName = (rule, value, callback) => {
        if (value) {
            if (value.length < 6 || value.length > 20) {
                this.setState({
                    activityName: ''
                });
                callback("活动名称长度在6-20之间！");
            }
            else {
                this.setState({
                    activityName: value
                });
                callback();
            }
        }
        else {
            this.setState({
                activityName: ''
            });
            callback();
        }

    }

    validateActivityIntroduce = (rule, value, callback) => {
        if (value) {
            if (value.length < 20 || value.length > 100) {
                this.setState({
                    activityIntroduction: ''
                });
                callback("活动介绍长度在20-100之间！");
            }
            else {
                this.setState({
                    activityIntroduction: value
                });
                callback();
            }
        }
        else {
            this.setState({
                activityIntroduction: ''
            });
            callback();
        }

    }
    validateActivityDate = (rule, value, callback) => {
        if (value) {


            let beginDate = moment(value[0]).toISOString().slice(0, 6).replace('-', '/') + moment(value[0]).toISOString().slice(6, 10).replace('-', '/') + ' ' + moment(value[0]).toISOString().slice(11, 19);
            let endDate = moment(value[1]).toISOString().slice(0, 6).replace('-', '/') + moment(value[1]).toISOString().slice(6, 10).replace('-', '/') + ' ' + moment(value[1]).toISOString().slice(11, 19);

            if (value[0] < new Date()) {
                this.setState({
                    beginDate: '',
                    endDate: ''
                });
                callback("活动开始时间应该大于当前时间！");
            }
            else {
                this.setState({
                    beginDate: beginDate,
                    endDate: endDate
                });
                callback();
            }
        }
        else {
            this.setState({
                beginDate: '',
                endDate: ''
            });
            callback();
        }
    }

    createClick() {
        const activityName = this.state.activityName;
        const activityIntroduction = this.state.activityIntroduction;
        const endDate = this.state.endDate;
        const beginDate = this.state.beginDate;


        if (activityName !== '' && activityIntroduction !== '' && endDate !== '' && beginDate !== '') {

            //是否能优化传递参数方式
            const addUrl = '?activity_name=' + activityName + '&activity_introduction=' + activityIntroduction + '&begindate=' + beginDate + '&enddate=' + endDate;
            fetch('/productservice/api/activity/create/' + addUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("创建活动成功!");
                        this.setState({
                            activityName: '',
                            activityIntroduction: '',
                            beginDate: '',
                            endDate: ''
                        });
                        this.props.form.resetFields();
                        // alert("创建活动成功!");
                    }
                    else {
                        message.error("创建活动失败!");
                        this.setState({
                            activityName: '',
                            activityIntroduction: '',
                            beginDate: '',
                            endDate: ''
                        });
                        this.props.form.resetFields();
                        // alert("创建活动失败!");
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
        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 5 }} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="活动名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入活动名称！' }, {
                                validator: this.validateActivityName,
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="活动介绍"
                    >
                        {getFieldDecorator('introduce', {
                            rules: [{ required: true, message: '请输入活动介绍！' }, {
                                validator: this.validateActivityIntroduce,
                            }],
                        })(
                            <TextArea rows={4} />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="活动时间"
                    >
                        {getFieldDecorator('datetime', {
                            rules: [{ required: true, message: '请选择活动时间！' }, {
                                validator: this.validateActivityDate,
                            }],
                        })(
                            <RangePicker
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                                showTime
                                format="YYYY/MM/DD HH:mm:ss"
                                // value={this.state.beginDate===undefined||this.state.endDate===undefined||this.state.beginDate===""||this.state.endDate===""?null:[moment(this.state.beginDate, "YYYY/MM/DD HH:mm:ss"), moment(this.state.endDate, "YYYY/MM/DD HH:mm:ss")]}
                                allowClear={false}
                            />
                        )}
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ span: 5, offset: 3 }}
                    >
                        <Button type="primary" htmlType="submit" onClick={this.createClick}>
                            提交
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        );
    }

}

const ActivityCreateForm = Form.create()(ActivityCreate);
export default ActivityCreateForm;
