import React from 'react';
import 'antd/dist/antd.css';
import OSS from 'ali-oss';
import moment from "moment";
import cookie from 'react-cookies';
import {
    Upload, message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Alert,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const { TextArea } = Input;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class ProductUpdate extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            uploading: false,
            activity: [],
            category: [],
            product_name: '',
            product_price: '',
            product_amount: '',
            clusternumber: '',
            limitamount: '',
            product_introduction: '',
            image_url: '',

            merchant_id: '',
            activity_id: '',
            category_id: '',

            activity_name: '',
            category_name: '',

            item: '',


        }
        this.checkClick = this.checkClick.bind(this);
    }

    componentDidMount() {
        const merchant_id = cookie.load('merchantId');
        const item = this.props.item;
        this.setState({
            merchant_id: merchant_id,
            item: item
        });
        fetch('/productservice//api/category/list/', {
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
                        category: data.data.rows
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            })

        fetch('/productservice/api/activity/list/normal/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    const activityList = data.data.rows;
                    let activity_name = '';
                    activityList.map((items) => {
                        if (items.activity_ID === item.activity_id) {
                            activity_name = items.activity_Name;
                        }
                    })
                    this.setState({
                        activity: data.data.rows,
                        activity_name: activity_name,
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            })

        const product_name = item.product_name;
        const activity_id = item.activity_id;
        const category_id = item.productcategory.id;
        const product_introduction = item.product_introduction;
        const image_url = item.image_url;
        const product_price = item.product_price;
        const product_amount = item.product_amount;
        const clusternumber = item.clusternumber;
        const limitamount = item.limitamount;




        const category_name = item.productcategory.category_name;

        this.setState({
            product_name: product_name,
            product_price: product_price,
            product_amount: product_amount,
            clusternumber: clusternumber,
            limitamount: limitamount,
            product_introduction: product_introduction,
            image_url: image_url,
            activity_id: activity_id,
            category_id: category_id,
            category_name: category_name,


        })

    }





    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }





    // handleUpload = () => {
    //     const { fileList } = this.state;
    //     const formData = new FormData();
    //     fileList.forEach((file) => {
    //         formData.append('files[]', file);
    //     });

    //     const key = "image/" + moment().format('YYYY-MM-DD HH:mm:ss');

    //     this.setState({
    //         uploading: false,
    //         image_url: key,
    //     });
    //     message.success('文件准备就绪！');

    // }

    validateProductName = (rule, value, callback) => {

        if (value) {
            if (value.length < 2 || value.length > 10) {
                this.setState({
                    product_name: ''
                });
                callback("产品名长度在2-10之间！");
            }
            else {
                this.setState({
                    product_name: value
                });
                callback();
            }
        }
        else {
            this.setState({
                product_name: ''
            });
            callback();
        }
    }

    validateIntroduction = (rule, value, callback) => {

        if (value) {
            if (value.length < 10 || value.length > 50) {
                this.setState({
                    product_introduction: ''
                });
                callback("产品介绍长度在10-50之间！");
            }
            else {
                this.setState({
                    product_introduction: value
                });
                callback();
            }
        }
        else {
            this.setState({
                product_introduction: ''
            });
            callback();
        }
    }


    validatePrice = (rule, value, callback) => {
        if (value) {

            if (/^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/.test(value)) {
                this.setState({
                    product_price: value
                });
                callback();
            }
            else {
                this.setState({
                    product_price: ''
                });
                callback("请输入小数点最多两位的的产品价格！(>0)");
            }
        }
        else {
            this.setState({
                product_price: ''
            });
            callback();
        }
    }

    validateAmount = (rule, value, callback) => {
        if (value) {

            if (/^\+?[1-9][0-9]*$/.test(value)) {
                this.setState({
                    product_amount: value
                });
                callback();
            }
            else {
                this.setState({
                    product_amount: ''
                });
                callback("请输入正整数！");
            }

        }
        else {
            this.setState({
                product_amount: ''
            });
            callback();
        }

    }
    validateCluster = (rule, value, callback) => {
        if (value) {

            if (/^\+?[1-9][0-9]*$/.test(value)) {

                if (this.state.limitamount !== '' && value > this.state.limitamount) {
                    this.setState({
                        clusternumber: ''
                    });
                    callback("最低购买数量应<=最多购买数量！");
                }
                else {
                    this.setState({
                        clusternumber: value
                    });
                    callback();
                }

            }
            else {

                this.setState({
                    clusternumber: ''
                });
                callback("请输入正整数！");


            }

        }
        else {
            this.setState({
                clusternumber: ''
            });
            callback();
        }
    }

    validateLimit = (rule, value, callback) => {
        if (value) {

            if (/^\+?[1-9][0-9]*$/.test(value)) {
                if (this.state.clusternumber !== '' && value < this.state.clusternumber) {
                    this.setState({
                        limitamount: ''
                    });
                    callback("最低购买数量应<=最多购买数量！");
                }
                else {
                    this.setState({
                        limitamount: value
                    });
                    callback();
                }
            }
            else {
                this.setState({
                    limitamount: ''
                });
                callback("请输入正整数！");
            }

        }
        else {
            this.setState({
                limitamount: ''
            });
            callback();
        }
    }


    checkClick() {

        const merchant_id = this.state.merchant_id;
        const activity_id = this.state.activity_id;
        const category_id = this.state.category_id;
        const product_name = this.state.product_name;
        const product_price = this.state.product_price;
        const product_amount = this.state.product_amount;
        const clusternumber = this.state.clusternumber;
        const limitamount = this.state.limitamount;
        const product_introduction = this.state.product_introduction;
        const image_url = this.state.image_url;

        const product_id = this.state.item.product_id;

        if (merchant_id !== '' && activity_id !== '' && category_id !== '' && product_name !== '' && product_price !== '' && product_amount !== '' && clusternumber !== '' && limitamount !== '' && product_introduction !== '' && image_url !== '') {


            //是否能优化传递参数方式
            const addUrl = '?activity_id=' + activity_id + '&category_id=' + category_id + '&product_name=' + product_name + '&product_price=' + product_price + '&product_amount=' + product_amount + '&clusternumber=' + clusternumber + '&limitamount=' + limitamount + '&product_introduction=' + product_introduction + '&image_url=' + image_url;
            fetch('/productservice/api/product/' + product_id + '/update/' + addUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {
                        if (this.state.fileList.length !== 0) {
                            const file = this.state.fileList[0];
                            const client = new OSS({
                                accessKeyId: 'LTAIqkb70CWOaqiJ',
                                accessKeySecret: 'yiJIbuKU25Px0LSDLqEcFp8aqjX8bW',
                                bucket: 'microservice-img-store',
                                region: 'oss-cn-beijing',
                            });
                            const oldKey = this.state.item.image_url;

                            const key = this.state.image_url;
                            client.delete(oldKey);

                            client.put(key, file);
                        }

                        message.success("产品信息修改成功！");

                        // alert("产品信息修改成功！");
                        this.setState({

                            fileList: [],

                            product_name: '',
                            product_price: '',
                            product_amount: '',
                            clusternumber: '',
                            limitamount: '',
                            product_introduction: '',
                            image_url: '',
                            activity_id: '',
                            category_id: '',

                            activity_name: '',
                            category_name: '',

                        });
                        this.props.form.resetFields();
                        // this.props.form.getFields("Img").onRemove();
                        // this.props.form.setFields({ "Img": "" });
                    }
                    else {
                        message.error("产品修改信息失败！");
                        // alert("产品修改信息失败！");
                        this.setState({
                            fileList: [],

                            product_name: '',
                            product_price: '',
                            product_amount: '',
                            clusternumber: '',
                            limitamount: '',
                            product_introduction: '',
                            image_url: '',
                            activity_id: '',
                            category_id: '',
                            activity_name: '',
                            category_name: '',

                        });
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
        const { uploading, fileList, image_url } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                        image_url: '',
                    };
                });
            },
            beforeUpload: (file) => {
                const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
                if (!isJPG) {
                    message.error('只能上传jpg或png格式的照片，请重新上传！');
                    return;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    message.error('照片大小必需小于2M，请重新上传！');
                    return;
                }

                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                this.state.fileList.splice(0, 1);

                const { fileList } = this.state;
                const formData = new FormData();
                fileList.forEach((file) => {
                    formData.append('files[]', file);
                });

                const key = "image/" + moment().format('YYYY-MM-DD HH:mm:ss');

                this.setState({
                    uploading: false,
                    image_url: key,
                });
                message.success('文件准备就绪！');

                return false;
            },
            fileList,
        };

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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
                <div className="title">产品信息修改</div>
                <Form.Item
                    label="产品名称"
                >
                    {getFieldDecorator('ProductName', {
                        initialValue: this.state.product_name,
                        rules: [{
                            message: '产品名称',
                        }, {
                            required: true, message: '请输入产品名称!',
                        }, {
                            validator: this.validateProductName,
                        }],
                    })(
                        <Input value={this.state.product_name} type="text" />
                    )}
                </Form.Item>

                <Form.Item
                    label="所属活动"
                >
                    {getFieldDecorator('Activity', {
                        initialValue: this.state.activity_name,
                        rules: [{
                            message: '所属活动',
                        }, {
                            required: true, message: '请输入所属活动!',
                        }],
                    })(

                        <Select
                            showSearch
                            placeholder="请选择一个活动！"
                            onChange={(value, key) => {
                                this.setState({
                                    activity_id: 1,
                                })
                                const index = Number(value.charAt(value.length - 1));
                                const id = this.state.activity[index].activity_ID;
                                this.setState({
                                    activity_id: id,
                                })


                            }}
                        >
                            {
                                this.state.activity.map((item, index) => {
                                    return <Option value={item.activity_Name + index} key={index}>{item.activity_Name}</Option>;
                                })
                            }

                        </Select>

                    )}
                </Form.Item>


                <Form.Item
                    label="所属类别"
                >
                    {getFieldDecorator('Category', {
                        initialValue: this.state.category_name,
                        rules: [{
                            message: '所属类别',
                        }, {
                            required: true, message: '请输入所属类别!',
                        }],
                    })(

                        <Select
                            showSearch
                            placeholder="请选择一个类别！"
                            onChange={(value) => {
                                const index = Number(value.charAt(value.length - 1));
                                const id = this.state.category[index].category_ID;
                                this.setState({
                                    category_id: id,
                                })
                            }}
                        >
                            {
                                this.state.category.map((item, index) => {
                                    return <Option value={item.category_Name + index} key={index}>{item.category_Name}</Option>;
                                })
                            }

                        </Select>

                    )}
                </Form.Item>


                <Form.Item
                    label="产品介绍"
                >
                    {getFieldDecorator('Introduction', {
                        initialValue: this.state.product_introduction,
                        rules: [{
                            message: '产品介绍',
                        }, {
                            required: true, message: '请输入产品介绍!',
                        }, {
                            validator: this.validateIntroduction,
                        }],
                    })(
                        <TextArea rows={4} />
                    )}
                </Form.Item>

                <Form.Item label="产品照片">

                    {getFieldDecorator('Img', {
                        rules: [{
                            message: '产品照片',
                        }, {
                            required: true, message: '请选择产品照片!',
                        }],
                    })(
                        <div>

                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> 选择图片
                                </Button>
                            </Upload>

                        </div>

                    )}



                </Form.Item>

                <Form.Item
                    label="产品价格"
                >
                    {getFieldDecorator('Price', {
                        initialValue: this.state.product_price,
                        rules: [{
                            message: '产品价格',
                        }, {
                            required: true, message: '请输入产品价格!',
                        }, {
                            validator: this.validatePrice,
                        }],
                    })(
                        <Input type='number' min="0" />
                    )}
                </Form.Item>

                <Form.Item
                    label="产品库存"
                >
                    {getFieldDecorator('Amount', {
                        initialValue: this.state.product_amount,
                        rules: [{
                            message: '产品库存',
                        }, {
                            required: true, message: '请输入产品库存!',
                        }, {
                            validator: this.validateAmount,
                        }],
                    })(
                        <Input type='number' min="1" />
                    )}
                </Form.Item>
                <Form.Item
                    label="最低购买数量"
                >
                    {getFieldDecorator('Cluster', {
                        initialValue: this.state.clusternumber,
                        rules: [{
                            message: '最低购买数量',
                        }, {
                            required: true, message: '请输入最低购买数量!',
                        }, {
                            validator: this.validateCluster,
                        }],
                    })(
                        <Input type='number' min="1" />
                    )}
                </Form.Item>
                <Form.Item
                    label="最多购买数量"
                >
                    {getFieldDecorator('Limit', {
                        initialValue: this.state.limitamount,
                        rules: [{
                            message: '最多购买数量',
                        }, {
                            required: true, message: '请输入最多购买数量!',
                        }, {
                            validator: this.validateLimit,
                        }],
                    })(
                        <Input type='number' min="1" />
                    )}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.checkClick}>确认修改</Button>
                </Form.Item>
            </Form>
        )

    }

}

const ProductUpdateForm = Form.create()(ProductUpdate);
export default ProductUpdateForm;