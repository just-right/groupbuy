import React from 'react';
import 'antd/dist/antd.css';
import './ShoppingCart.css';
import cookie from 'react-cookies';
import { Tabs, Icon, message, Empty, List, Row, Col, Button, Pagination, InputNumber, Modal, Select } from 'antd';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            userFlag: false,
            orderList: [],
            tmpOderList: [],
            productList: [],
            tmpProductList: [],
            count: 0,
            page: 8,
            tmpOrder: [],
            pageNumber: 1,
            changevisible: false,
            addressList: [],
            addresInfo: '',
            emptyFlag: false
        }
        this.pageChange = this.pageChange.bind(this);
        this.payClick = this.payClick.bind(this);
    }




    handleCancel = (e) => {
        console.log(e);
        this.setState({
            changevisible: false,
        });
        this.componentDidMount();
    }

    numberChange = (index, value) => {
        if (value) {
            // const index= 0;
            const tmpOder = this.state.tmpOderList[index];
            if (value > this.state.tmpProductList[index].limitamount || value < this.state.tmpProductList[index].clusternumber) {
                message.error("请输入正确的数量！")
            }
            else {
                tmpOder.order_amount = value;
                tmpOder.order_money = value * tmpOder.product_price;
                this.setState({
                    tmpOrder: tmpOder
                })
                this.state.tmpOderList[index] = tmpOder;

                const id = tmpOder.order_id;
                const order_amount = value;
                fetch('/orderservice/api/order/' + id + '/update' + '?order_amount=' + order_amount, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            this.componentDidMount();
                        }

                        else {
                            message.error("发生了一点错误！");
                        }
                    })

            }
        }
        else {
            message.info("数量不能为空！");
        }
    }

    payClick() {
        this.componentDidMount();

        if (this.state.addresInfo === '') {
            message.info("请先选择收货地址！")
        }
        else {

            const productId = this.state.tmpOrder.product_id;
            let res = '';
            this.state.tmpProductList.every((item) => {
                if (item.product_id === productId) {
                    res = this.state.tmpOrder.order_amount > item.product_amount ? true : false;
                    if (res) {
                        message.info("库存不足！！！");
                        return false; 
                    }

                }
            })
            if (!res) {
                const id = this.state.tmpOrder.order_id;
                fetch('/orderservice/api/order/' + id + '/pay' + '?address_info=' + this.state.addresInfo, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            message.success("结算成功！");
                            this.handleCancel();
                        }

                        else {
                            message.error("发生了一点错误！");
                        }
                    })
            }
        }

    }

    addresinit() {
        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            fetch('/userservice/api/address/list/' + id, {
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
                            addressList: data.data.rows,
                        })

                    }
                    else {
                        message.error("发生了一点错误！");
                    }
                })
        }

    }

    componentDidMount() {
        this.addresinit();
        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            fetch('/orderservice/api/order/list/by/user/' + id + '/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        const list = data.data.rows;
                        const count = data.data.count;
                        const productList = data.productrows;
                        const flag = list.length === 0 ? true : false;
                        this.setState({
                            orderList: list,
                            tmpOderList: data.data.rows.slice(0, 8),
                            productList: productList,
                            tmpProductList: data.productrows.slice(0, 8),
                            count: count,
                            userID: id,
                            emptyFlag: flag
                        })


                    }

                    else {
                        message.error("发生了一点错误！");
                    }
                })


        }
        else {
            this.setState({
                userFlag: true
            })
        }

    }




    pageChange(page) {

        const start = (page - 1) * this.state.page;
        const end = start + this.state.page;
        const orderList = this.state.orderList.slice(start, end);
        const productList = this.state.productList.slice(start, end);
        this.setState({
            tmpOderList: orderList,
            tmpProductList: productList,
            pageNumber: page
        });
    }

    calcClick(index) {
        if (this.state.addressList.length === 0) {
            message.info("您还没有收货地址，快去个人中心->收货地址处添加吧！")
        }
        else {
            const tmpOrder = this.state.tmpOderList[index];
            // alert(tmpOder.order_id);
            this.setState({
                changevisible: true,
                tmpOrder: tmpOrder,
            });
        }
    }





    deletClick(index) {


        confirm({
            title: '确认删除么？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const start = (this.state.pageNumber - 1) * this.state.page;
                const end = start + this.state.page;
                const order_id = this.state.orderList[this.state.page * (this.state.pageNumber - 1) + index].order_id;
                fetch('/orderservice/api/order/' + order_id + '/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            this.state.orderList.splice(this.state.page * (this.state.pageNumber - 1) + index, 1);
                            this.state.productList.splice(this.state.page * (this.state.pageNumber - 1) + index, 1);

                            const tmpOrderlist = this.state.orderList.slice(start, end)
                            const tmpProductList = this.state.productList.slice(start, end);


                            const count = this.state.count - 1;
                            this.setState({
                                tmpOderList: tmpOrderlist,
                                tmpProductList: tmpProductList,
                                count: count,
                            })

                            message.success("删除成功！");
                        }

                        else {
                            message.error("发生了一点错误！");
                        }
                    })

            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }






    render() {

        if (this.state.userFlag) {
            message.info("请先登录！");
            return <Empty />;

        }

        if (this.state.emptyFlag) {
            // message.info("没有订单信息！");
            return <Empty />;
        }
        return (
            <Tabs defaultActiveKey="1" style={{ textAlign: 'center' }}>
                <TabPane tab={<span><Icon type="shopping-cart" />购物车列表</span>} key="1">
                    <List
                        size="large"
                        header={
                            <div className="gutter-example">
                                <Row gutter={20} justify="center">
                                    <Col className="gutter-row" span={5}>
                                        <div className="gutter-box">产品</div>
                                    </Col>
                                    <Col className="gutter-row" span={5}>
                                        <div className="gutter-box">单价</div>
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">数量</div>
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">合计</div>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <div className="gutter-box">操作</div>
                                    </Col>

                                </Row>
                            </div>

                        }

                        footer={<div>心情好的时候总想买点东西</div>}
                        bordered
                    >
                        {
                            this.state.tmpOderList.map((item, index) => {
                                return <List.Item key={Math.random()}>
                                    <div className="gutter-example">
                                        <Row gutter={20} justify="center">
                                            <Col className="gutter-row" span={5}>
                                                <div className="gutter-box"><img style={{ width: 50, height: 50 }} src={'http://microservice-img-store.oss-cn-beijing.aliyuncs.com/' + this.state.tmpProductList[index].image_url}></img>&nbsp;&nbsp;<span>{item.product_name}</span></div>
                                            </Col>
                                            <Col className="gutter-row" span={5}>
                                                <div className="gutter-box"><span><Icon type="money-collect" theme="twoTone" />&nbsp;&nbsp;{item.product_price}元/Kg</span></div>
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                <div className="gutter-box"><span><InputNumber defaultValue={item.order_amount} min={this.state.tmpProductList[index].clusternumber} max={this.state.tmpProductList[index].limitamount} onChange={this.numberChange.bind(this, index)}>

                                                </InputNumber></span></div>
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                <div className="gutter-box"><span><Icon type="money-collect" theme="twoTone" />&nbsp;&nbsp;{item.order_money}元</span></div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div className="gutter-box"><Button type="danger" onClick={this.deletClick.bind(this, index)}>删除</Button>&nbsp;&nbsp;<Button type="primary" onClick={this.calcClick.bind(this, index)}>结算</Button></div>
                                            </Col>

                                        </Row>
                                    </div>


                                </List.Item>
                                // return<List.Item key={index}><span>{item.product_name}</span><span>{item.product_price}</span><span>{item.order_amount}</span><span>{item.order_money}</span></List.Item>;
                            })
                        }

                    </List>

                    <Modal
                        title="订单结算"
                        visible={this.state.changevisible}
                        onOk={this.handleCancel}
                        onCancel={this.handleCancel}
                        cancelText="取消"
                        okText="退出界面"
                    >
                        {
                            <div style={{ height: 100, marginTop: '5%' }}>

                                <span>请选择收货地址：</span>
                                <Select
                                    style={{ width: '50%' }}
                                    showSearch
                                    placeholder="请选择一个收货地址！"
                                    onChange={(value) => {
                                        this.setState({
                                            addresInfo: value,
                                        })
                                    }}
                                >
                                    {
                                        this.state.addressList.map((item, index) => {
                                            return <Option value={item.address} key={index}>{item.address}</Option>;
                                        })
                                    }
                                </Select>&nbsp;&nbsp;
                          <Button type="primary" onClick={this.payClick}>去支付</Button>


                            </div>
                        }
                    </Modal>

                    <div className="page">
                        <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                    </div>
                </TabPane>
            </Tabs>
        );
    }


}

export default ShoppingCart;