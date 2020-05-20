import React from 'react';
import 'antd/dist/antd.css';
import './PendingReceipt.css';
import cookie from 'react-cookies';
import { Tabs, Icon, message, Empty, List, Row, Col, Button, Pagination, InputNumber, Modal, Select } from 'antd';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
class OverOrder extends React.Component {
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

    }





    componentWillMount() {
     
        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            fetch('/orderservice/api/order/overlist/by/userid/' + id , {
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
                        const flag = list.length === 0?true:false;
                       
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


    render() {

        if (this.state.userFlag) {
            message.info("请先登录！");
            return <Empty />;
        }

        if(this.state.emptyFlag){
            // message.info("没有订单信息！");
            return <Empty />;
        }
        return (
            <Tabs defaultActiveKey="1" style={{ textAlign: 'center' }}>
                <TabPane tab={<span><Icon type="shopping-cart" />历史订单列表</span>} key="1">
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
                                        <div className="gutter-box">状态</div>
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
                                                <div style={{ marginLeft: '30%', textAlign: 'left' }}><img style={{ width: 50, height: 50 }} src={'http://microservice-img-store.oss-cn-beijing.aliyuncs.com/' + this.state.tmpProductList[index].image_url}></img>&nbsp;&nbsp;<span>{item.product_name}</span></div>
                                            </Col>
                                            <Col className="gutter-row" span={5}>
                                                <div className="gutter-box"><span><Icon type="money-collect" theme="twoTone" />&nbsp;&nbsp;{item.product_price}元/Kg</span></div>
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                <div className="gutter-box"><span><Icon type="check-circle" theme="twoTone" />&nbsp;&nbsp;{item.order_amount}
                                                </span>

                                                </div>
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                <div className="gutter-box"><span><Icon type="money-collect" theme="twoTone" />&nbsp;&nbsp;{item.order_money}元</span></div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                            <div className="gutter-box"><span><Icon type="clock-circle" theme="twoTone" />&nbsp;&nbsp;已评价->历史订单</span></div>
                                            </Col>

                                        </Row>
                                    </div>


                                </List.Item>
                                // return<List.Item key={index}><span>{item.product_name}</span><span>{item.product_price}</span><span>{item.order_amount}</span><span>{item.order_money}</span></List.Item>;
                            })
                        }

                    </List>



                    <div className="page">
                        <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                    </div>
                </TabPane>
            </Tabs>
        );
    }


}

export default OverOrder;