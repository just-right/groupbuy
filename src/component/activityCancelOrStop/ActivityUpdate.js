import React from 'react';
import { message, DatePicker } from 'antd';
import moment, { isMoment } from 'moment';

import {
    Form, Input, Button,
} from 'antd';

const { TextArea } = Input;
const RangePicker = DatePicker.RangePicker;
class ActivityUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity_ID: '',
            activityName: '',
            activityIntroduction: '',
            beginDate: '',
            endDate: '',
            data: '',
        }
        this.updateClick = this.updateClick.bind(this);

    }
    componentWillMount() {
        const data = this.props.data;
        
        const beginDate = moment(data.beginDate).format('YYYY-MM-DD HH:mm:ss').replace(/-/g,'/');
        const endDate = moment(data.endDate).format('YYYY-MM-DD HH:mm:ss').replace(/-/g,'/');
        this.setState({
            data: data,
            activity_ID: data.activity_ID,
            activityName: data.activity_Name,
            activityIntroduction: data.activity_Introduction,
            beginDate: beginDate,
            endDate: endDate,
        })
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

    updateClick() {
        const activityName = this.state.activityName;
        const activityIntroduction = this.state.activityIntroduction;
        const endDate = this.state.endDate;
        const beginDate = this.state.beginDate;

        const activity_ID = this.state.activity_ID;
        if (activityName !== '' && activityIntroduction !== '' && endDate !== '' && beginDate !== '') {

            //是否能优化传递参数方式
            const addUrl = '?activity_name=' + activityName + '&activity_introduction=' + activityIntroduction + '&begindate=' + beginDate + '&enddate=' + endDate;
            fetch('/productservice/api/activity/'+activity_ID+'/update/' + addUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("团购活动修改成功!");
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
                        message.error("团购活动修改失败!");
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
                <div style={{ textAlign: 'center',fontWeight: 'bold' ,fontSize: '1.5em',marginBottom:'5%' }}>团购活动修改</div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="活动名称"
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.activityName,
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
                            initialValue: this.state.activityIntroduction,
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
                            initialValue:[moment(this.state.beginDate, 'YYYY/MM/DD HH:mm:ss'), moment(this.state.endDate, 'YYYY/MM/DD HH:mm:ss')],
                         
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
                        <Button type="primary" htmlType="submit" onClick={this.updateClick}>
                            确认修改
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        );
    }

}

const ActivityUpdateForm = Form.create()(ActivityUpdate);
export default ActivityUpdateForm;
