import React from 'react';

import {
    message, Form, Input, Button,
} from 'antd';

class CategoryCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        }
        this.createClick = this.createClick.bind(this);

    }
    componentDidMount() {

    }


    validateCategoryName = (rule, value, callback) => {
        if (value) {
            if (value.length < 2 || value.length > 20) {
                this.setState({
                    categoryName: ''
                });
                callback("类别名称长度在2-20之间！");
            }
            else {
                const addUrl = '?category_name=' + value;
                fetch('/productservice/api/category/create/checkby/categoryname' + addUrl, {
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
                                categoryName: ''
                            });
                            callback("类别已存在！");
                        }
                        else {
                            this.setState({
                                categoryName: value
                            });
                            callback();
                        }
                    })
            }
        }
        else {
            this.setState({
                categoryName: ''
            });
            callback();
        }

    }



    createClick() {
        const categoryName = this.state.categoryName;



        if (categoryName !== '') {

            //是否能优化传递参数方式
            const addUrl = '?category_name=' + categoryName;
            fetch('/productservice/api/category/create/' + addUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        message.success("创建类别成功!");
                        this.props.form.resetFields();
                        // alert("创建类别成功!");
                    }
                    else {
                        message.error("创建类别失败!");
                        this.props.form.resetFields();
                        // alert("创建类别失败!");
                    }
                })
                this.setState({
                    categoryName: ''
                });
        }
        else {
            message.error("请完善相关信息");
            // alert("请完善相关信息！");
            this.setState({
                categoryName: ''
            });
        }
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 5 }} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="类别名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入类别名称！' }, {
                                validator: this.validateCategoryName,
                            }],
                        })(
                            <Input />
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

const CategoryCreateForm = Form.create()(CategoryCreate);
export default CategoryCreateForm;
