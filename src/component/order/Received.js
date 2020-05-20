import React from 'react';
import 'antd/dist/antd.css';
import './PendingReceipt.css';
import cookie from 'react-cookies';
import Comment from './Comment';
import { Tabs, Icon, message, Empty, List, Row, Col, Button, Pagination, Modal, Select, Rate, Input } from 'antd';
const desc = ['一星', '两星', '三星', '四星', '五星'];
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const Option = Select.Option;
const { TextArea } = Input;
class Received extends React.Component {

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
            emptyFlag: false,
            visible: false,
            indexNumber: '',
            score: 5,
            comment: '',
        }
        this.pageChange = this.pageChange.bind(this);
        this.putCommentClick = this.putCommentClick.bind(this);
    }

    commentClick(index) {
        this.setState({
            visible: true,
            indexNumber: index
        })
        // this.componentDidMount();

    }



    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.componentWillMount();
    }



    componentWillMount() {

        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            fetch('/orderservice/api/order/receiptlist/by/userid/' + id, {
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

    putCommentClick(score, comment, order) {

        if (score !== '' && comment !== '') {
            const tmpOrder = order;
            const id = tmpOrder.order_id;
            const user_id = cookie.load('userId');
            const product_id = tmpOrder.product_id;

            const addUrl = '?user_id=' + user_id + '&product_id=' + product_id + '&comment_content=' + comment + '&score=' + score;
            fetch('/orderservice/api/comment/' + id + '/create' + addUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        message.success("评价成功！");
                        this.setState({
                            score: 5,
                            comment: '',
                        })
                        this.handleCancel();
                        // this.componentDidMount()
                    }
                    else {
                        message.error("发生了一点错误！");
                    }
                })
        }

        else {
            message.info("请完善相关信息！");
        }

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
                <TabPane tab={<span><Icon type="shopping-cart" />待评价订单列表</span>} key="1">
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
                                                <div className="gutter-box"><span><Icon type="clock-circle" theme="twoTone" />&nbsp;&nbsp;已确认收货->待评价&nbsp;&nbsp;&nbsp;&nbsp;</span><Button type="primary" onClick={this.commentClick.bind(this, index)}>去评价</Button></div>
                                            </Col>

                                        </Row>
                                    </div>


                                </List.Item>
                                // return<List.Item key={index}><span>{item.product_name}</span><span>{item.product_price}</span><span>{item.order_amount}</span><span>{item.order_money}</span></List.Item>;
                            })
                        }

                    </List>

                    <Modal
                        title="发表评论"
                        visible={this.state.visible}
                        onOk={this.handleCancel}
                        onCancel={this.handleCancel}
                        cancelText="取消"
                        okText="退出界面"
                    >



                        {

                            <Comment key={Math.random()} index={this.state.indexNumber} item={this.state.tmpOderList[this.state.indexNumber]} put={this.putCommentClick}></Comment>
                        }

                    </Modal>



                    <div className="page">
                        <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                    </div>
                </TabPane >
            </Tabs >
        );
    }


}

export default Received;