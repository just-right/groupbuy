import React from 'react';

import {
    message, Form, Input, Button,
} from 'antd';

import  './CategoryUpdate.css';

class CategoryUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: ''
        }

    }
    componentDidMount() {
        const item = this.props.item;

        this.setState({
            item: item
        })
    }


    

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

                    <Form.Item
                       label="原类别名称："
                    >
                        {
                            this.state.item.category_Name
                        }
                    </Form.Item>


                    <Form.Item
                        label="新类别名称："
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入新类别名称！' }, {
                                validator: this.props.validateUpdateCategoryName,
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>


                </Form>

            </div>
        );
    }

}

const CategoryUpdateForm = Form.create()(CategoryUpdate);
export default CategoryUpdateForm;
