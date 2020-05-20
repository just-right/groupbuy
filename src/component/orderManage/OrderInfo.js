import React from 'react'
import { List, Modal, Button, message, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import './OrderManage.css';
import cookie from 'react-cookies';
const confirm = Modal.confirm;
class OrderInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tmpdata: [],
            tmpdataList: [],
            page: 8,
            status: ['订单已在购物车', '订单已支付', '订单已发货', '客户已收货', '客户已评价','订单已发货'],
            count: 0,
            visible: false,
            emptyFlag: false,
            userName: '',
            orderStatus: ''


        }
        this.handleOk = this.handleOk.bind(this);
        this.pageChange = this.pageChange.bind(this);

    }

    pageChange(page) {

        const start = (page - 1) * this.state.page;
        const end = start + this.state.page;
        const tmpdataList = this.state.data.slice(start, end);
        this.setState({
            tmpdataList: tmpdataList,
            pageNumber: page
        });
    }

    componentDidMount() {
        const merchant_id = cookie.load('merchantId');
        fetch('/orderservice/api/order/list/by/merchant/' + merchant_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    const flag = data.data.rows.length === 0 ? true : false;
                    this.setState({
                        count: data.data.count,
                        data: data.data.rows,
                        tmpdataList: data.data.rows.slice(0, 8),
                        emptyFlag: flag,

                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });

    }

    showModal = (item) => {
        const user_id = item.user_id;


        fetch('/userservice/api/user/' + user_id + '/normal', {
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
                        userName: data.data.userName
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });

        const order_status = item.order_status;
        let status;
        switch (order_status) {
            case 1:
                status = '订单已在购物车';
                break;
            case 2:
                status = '订单已支付';
                break;
            case 3:
                status = '订单已发货';
                break;
            case 4:
                status = '客户已收货';
                break;
            case 5:
                status = '客户已评价';
                break;
            case 6:
                status = '订单已发货';
                break;
            default:
                status = '订单已在购物车';

        }

        this.setState({
            visible: true,
            tmpdata: item,
            orderStatus: status

        });


    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }





    render() {
        if (this.state.emptyFlag) {
            message.info("没有订单信息！");
            return <Empty />;
        }
        return (
            <div>
                <List itemLayout="horizontal" dataSource={this.state.tmpdataList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<span >订单号：{item.order_id}---><span className="status">{this.state.status[item.order_status - 1]}</span></span>}
                                description={<span><Button onClick={this.showModal.bind(this, item)} type="primary" ghost>详&nbsp;&nbsp;情</Button></span>}
                            />
                        </List.Item>
                    )
                    }
                >
                </List>
                <Modal
                    title="订单信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    okText="确认"
                    cancelText="关闭"
                >
                    <p><span className='tip'>订单号：</span><span className='value'>{this.state.tmpdata.order_id}</span></p>
                    <p><span className='tip'>客户名：</span><span className='value'>{this.state.userName}</span></p>

                    <p><span className='tip'>产品名称：</span><span className='value'>{this.state.tmpdata.product_name}</span></p>
                    <p><span className='tip'>产品价格：</span><span className='value'>{this.state.tmpdata.product_price}</span></p>
                    <p><span className='tip'>订单数量：</span><span className='value'>{this.state.tmpdata.order_amount}</span></p>
                    <p><span className='tip'>订单金额：</span><span className='value'>{this.state.tmpdata.order_money}</span></p>

                    <p><span className='tip'>收货地址：</span><span className='value'>{this.state.tmpdata.address_info}</span></p>
                    <p><span className='tip'>订单状态：</span><span className='value'>{this.state.orderStatus}</span></p>



                </Modal>
                <Pagination style={{ textAlign: 'center' }} defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
            </div>
        );
    }
}

export default OrderInfo;