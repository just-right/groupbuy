import React from 'react';
import 'antd/dist/antd.css';
import cookie from 'react-cookies';
import DeliveredReceipt from './DeliveredReceipt';
import PendingReceipt from './PendingReceipt';
import Received from './Received';
import OverOrder from './OverOrder';
import { Tabs, Icon, message, Empty, List, Row, Col, Button, Pagination, InputNumber, Modal } from 'antd';
const TabPane = Tabs.TabPane;
class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            publicContent: <DeliveredReceipt></DeliveredReceipt>,
        }
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount() {
        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            this.setState({
                userId: id,
            })
        }
    }

    refresh(activeKey) {
        // alert(activeKey);
        switch (activeKey) {
            case "1":
                this.setState({
                    publicContent: <DeliveredReceipt></DeliveredReceipt>,
                })
                break;
            case "2":
                this.setState({
                    publicContent: <PendingReceipt></PendingReceipt>,
                })
                break;
            case "3":
                this.setState({
                    publicContent: <Received></Received>,
                })
                break;
            case "4":
                this.setState({
                    publicContent: <OverOrder></OverOrder>,
                })
                break;
            default:
                this.setState({
                    publicContent: <DeliveredReceipt></DeliveredReceipt>,
                })

        }
    }

    render() {
        if (this.state.userId === '') {
            message.info("请先登录！");
            return <Empty></Empty>;
        }
        return (<Tabs defaultActiveKey="1" style={{ textAlign: 'center' }} onChange={this.refresh}>
            <TabPane tab={<span  ><Icon type="shopping" theme="twoTone" />待发货</span>} key="1" >
                {
                    this.state.publicContent
                }
            </TabPane>
            <TabPane tab={<span  ><Icon type="flag" theme="twoTone" />待收货</span>} key="2" >
                {
                    this.state.publicContent
                }
            </TabPane>
            <TabPane tab={<span><Icon type="message" theme="twoTone" />待评价</span>} key="3" >
                {
                    this.state.publicContent
                }
            </TabPane>
            <TabPane tab={<span ><Icon type="message" theme="twoTone" />历史订单</span>} key="4" >
                {
                    this.state.publicContent
                }
            </TabPane>
        </Tabs>)
    }
}
export default Order;   