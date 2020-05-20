import React from 'react';
import 'antd/dist/antd.css';
import './ProductInfo.css';
import cookie from 'react-cookies';
import ProductComment from './ProductComment';
import { Card, List, Icon, InputNumber, Tabs, message, Pagination, Layout, Button } from 'antd';
const {
    Header, Footer, Sider, Content,
} = Layout;
const { Meta } = Card;
const TabPane = Tabs.TabPane;
class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],

            user_id: '',
            product_id: '',
            product_name: '',
            product_price: '',
            // order_money: '',
            merchant_id: '',
            // address_info: '',
            order_amount: '',

            categoryName: '',
            storeName: ''

        }
        this.numberChange = this.numberChange.bind(this);
        this.addCart = this.addCart.bind(this);

    }

    componentWillMount() {
        const item = this.props.item;
        const product_id = item.product_id;
        const product_name = item.product_name;
        const product_price = item.product_price;
        const order_amount = item.clusternumber;
        this.getMerchantIdAndStoreName(item);
        this.getCategoryName(item);

        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            this.setState({
                user_id: id,
            })
        }
        this.setState({
            product: item,
            product_id: product_id,
            product_name: product_name,
            product_price: product_price,
            order_amount: order_amount
        })

   

    }


    getCategoryName(item) {
        const category_id = item.category_id;
        fetch('/productservice/api/category/' + category_id + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const categoryName = data.data.category_Name;
                    this.setState({
                        categoryName: categoryName,
                    })
                }

                else {
                    message.error("发生了一点错误！");
                }
            })
    }

    getMerchantIdAndStoreName(item) {
        const product_id = item.product_id;
        fetch('/productservice/api/product/get/merchantid/' + product_id + '/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const merchant_id = data.data.merchant_id;
                    fetch('/userservice/api/merchant/' + merchant_id + '/normal/', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.code === 200) {
                                const store_name = data.data.store_Name;
                                this.setState({
                                    storeName: store_name,
                                })
                            }

                            else {
                                message.error("发生了一点错误！");
                            }
                        })
                    this.setState({
                        merchant_id: merchant_id,
                    })
                }

                else {
                    message.error("发生了一点错误！");
                }
            })



    }



    numberChange(value) {
        if (value) {
            if (value > this.state.product.limitamount || value < this.state.product.clusternumber) {
                message.error("请输入正确的数量！")
            }
            else {
                this.setState({
                    order_amount: value
                })
            }
        }
        else {
            message.info("数量不能为空！");
        }
    }

    addCart() {
        if (this.state.user_id === '') {
            message.info("请先登录，再购买产品！")
        }
        else {


            if (this.state.order_amount === '') {
                message.error("请输入购买的产品数量！")
            }
            else {

                const user_id = this.state.user_id;
                const product_id = this.state.product_id;
                const product_name = this.state.product_name;
                const product_price = this.state.product_price;
                const order_amount = this.state.order_amount;

                const order_money = product_price * order_amount;
                const merchant_id = this.state.merchant_id;
                const address_info = '';

                const addUrl = '?product_id=' + product_id + '&product_name=' + product_name + '&product_price=' + product_price + '&order_amount=' + order_amount + '&order_money=' + order_money + '&merchant_id=' + merchant_id + '&address_info=' + address_info;
                fetch('/orderservice/api/order/' + user_id + '/create/' + addUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            message.success("已加入购物车！");
                            this.setState({
                                order_amount: 1,
                            })

                        }

                        else {
                            message.error("发生了一点错误！");
                        }
                    })


            }
        }
    }


    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" style={{ textAlign: 'center' }}>
                    <TabPane tab={<span><Icon type="shopping" />产品详情</span>} key="1">
                        <Layout className="layout">
                            <Sider >
                                <Card
                                    hoverable
                                    style={{ width: 320, textAlign: 'center' }}
                                    cover={<img key={Math.random()} src={'http://microservice-img-store.oss-cn-beijing.aliyuncs.com/' + this.state.product.image_url}></img>}
                                >
                                    <Meta
                                        title={this.state.product.product_name}
                                        description={this.state.product.product_introduction}
                                    />
                                </Card>

                            </Sider>
                            <Content className="detailcontent">
                                <List>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="project" theme="twoTone" />&nbsp;&nbsp;产品名称：{this.state.product.product_name}</span>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="shop" theme="twoTone" />&nbsp;&nbsp;所属店铺：{this.state.storeName}</span>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="tag" theme="twoTone" />&nbsp;&nbsp;所属类别：{this.state.categoryName}</span>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="money-collect" theme="twoTone" />&nbsp;&nbsp;产品价格：{this.state.product.product_price}元/Kg</span>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="profile" theme="twoTone" />&nbsp;&nbsp;产品介绍：{this.state.product.product_introduction}</span>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="minus-circle" theme="twoTone" />&nbsp;&nbsp;最低购买数量：{this.state.product.clusternumber}Kg</span>}
                                        />
                                    </List.Item>
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<span><Icon type="plus-circle" theme="twoTone" />&nbsp;&nbsp;最高购买数量：{this.state.product.limitamount}Kg</span>}
                                        />
                                    </List.Item>
                                </List>
                                <InputNumber defaultValue={this.state.product.clusternumber} min={this.state.product.clusternumber} max={this.state.product.limitamount} onChange={this.numberChange}></InputNumber>
                                &nbsp;<Button type="primary" onClick={this.addCart}>加入购物车</Button>
                            </Content>
                        </Layout>
                    </TabPane>
                    <TabPane tab={<span><Icon type="edit" />产品评论</span>} key="2">
                        <ProductComment key={Math.random()} id={this.state.product_id}></ProductComment>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}


export default ProductDetail;