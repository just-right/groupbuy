import React from 'react';
import 'antd/dist/antd.css';
import cookie from 'react-cookies';
import { Tabs, Icon, message, Empty, List, Row, Col, Button, Pagination, InputNumber, Badge, Select } from 'antd';
import './MessageInfo.css';
const TabPane = Tabs.TabPane;
class MessageInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            userFlag: false,

            count: 0,
            page: 8,

            pageNumber: 1,


            emptyFlag: false,
            messageList: [],
            tmpMessageList: [],
            objectList: [],
        }
        this.pageChange = this.pageChange.bind(this);


    }




    delClick(index) {
        // const list = this.state.messageList;
        // const objectList = this.state.objectList;

        const start = (this.state.pageNumber-1) * this.state.page;
        const object = this.state.objectList[start+index];
        const addUrl = '?object=' + object;
        fetch('/orderservice/api/order/message/delete/' + addUrl, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    message.success("移除消息成功！");
                }
                else {
                    message.error("发生了一点错误！");
                }
                this.initMsg();
            })

    
      


    }


    componentDidMount() {

        this.initMsg();


    }

    initMsg() {
        if (cookie.load('merchantId')) {
            const id = cookie.load('merchantId');
            const addUrl = '?id=' + id + '&flag=2';
            fetch('/orderservice/api/order/get/message/' + addUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        const flag = data.msgList.length === 0 ? true : false;
                        if (!flag) {
                            this.setState({
                                userID: id,
                                messageList: data.msgList,
                                tmpMessageList: data.msgList.slice(0, 8),
                                count: data.count,
                                userFlag: false,
                                emptyFlag: false,
                                objectList: data.objectList,
                            })
                        }
                        else {

                            this.setState({

                                count: 0,
                                userFlag: false,
                                emptyFlag: true,

                            })
                        }


                    }
                    else {
                        message.info("操作太频繁！");
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
        const tmpMessageList = this.state.messageList.slice(start, end);

        this.setState({
            tmpMessageList: tmpMessageList,
            pageNumber: page
        });
    }


    render() {

        if (this.state.emptyFlag) {
            // message.info("没有订单信息！");
            return <Empty />;
        }
        return (
            <Tabs defaultActiveKey="1" style={{ textAlign: 'center' }}>
                <TabPane tab={<span><Icon type="notification" />消息提示列表 <Badge count={this.state.count} style={{ marginLeft: '10%', marginBottom: '20%' }} />
                </span>} key="1">
                    <List
                        // size="large"
                        header={
                            <div className="gutter-example">
                                <Row gutter={16} justify="center">
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">序号</div>
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        <div className="gutter-box">消息内容</div>
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">时间</div>
                                    </Col>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">操作</div>
                                    </Col>


                                </Row>
                            </div>

                        }

                        footer={<div>心情好的时候总想买点东西</div>}
                        bordered
                        dataSource={this.state.tmpMessageList}
                        renderItem={
                            (item, index) => (
                                <List.Item key={Math.random()}>
                                    <div className="row">
                                        <Row gutter={16} justify="center">
                                            <Col className="gutter-row"  span={4}>
                                                <div className="gutter-box">{index + 1}</div>
                                            </Col>
                                            <Col className="gutter-row" span={12}>
                                                <div className="gutter-box" style={{color: 'red'}}> {item}</div>
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                <div className="gutter-box"> {this.state.objectList[index].split('order-')[1]}</div>
                                            </Col>
                                            <Col className="gutter-row" span={4}>
                                                <div className="gutter-box"> <Button type="primary" onClick={this.delClick.bind(this, index)}>我知道了！</Button></div>
                                            </Col>


                                        </Row>
                                    </div>


                                </List.Item>
                                // return<List.Item key={index}><span>{item.product_name}</span><span>{item.product_price}</span><span>{item.order_amount}</span><span>{item.order_money}</span></List.Item>;
                            )
                        }

                    >



                    </List>


                    <div className="page">
                        <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                    </div>
                </TabPane>
            </Tabs>
        );
    }


}

export default MessageInfo