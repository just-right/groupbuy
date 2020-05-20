import React from 'react';
import {
    Layout, Menu, Breadcrumb, Icon, Dropdown, Button, Modal, Badge, message
} from 'antd';
import 'antd/dist/antd.css';
import './MerchantIndex.css';
import PublicContent from './PublicContent';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import SockJsClient from 'react-stomp';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;

class MerchantIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            merchantName: '',
            productMange: ["上架产品", "修改&下架产品"],
            orderMange: ["订单信息", "确认&取消订单", "提醒用户签收"],
            msgInfo: ["消息提示"],
            selfMange: ["个人信息", "个人信息修改"],
            breadcrumb: ["每天都是好心情！"],
            PublicContent: <PublicContent></PublicContent>,
            count: 0,
            merchantId: '',
        }
        this.showConfirm = this.showConfirm.bind(this);
        this.receiveMsg = this.receiveMsg.bind(this);
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
                        const count = data.msgList.length;
                        this.setState({
                            count: count,
                            merchantId: id,
                        })

                    }
                    else {
                        message.info("出现了一点错误！");
                    }
                })
        }

    }

    componentWillMount() {
        const username = cookie.load('merchantName');
        this.setState({
            merchantName: username
        });
        this.initMsg();






    }

    receiveMsg(msg) {
        message.info(msg, 5);
        cookie.remove('merchantId', { path: '/' });
        cookie.remove('merchantName', { path: '/' });
        cookie.remove('merchantPassword', { path: '/' });
        this.setState({
            merchantName: ''
        });
    }

    showConfirm() {
        confirm({
            title: '确定退出登录么？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                cookie.remove('merchantId', { path: '/' });
                cookie.remove('merchantName', { path: '/' });
                cookie.remove('merchantPassword', { path: '/' });
                this.setState({
                    merchantName: ''
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // sendMessage = (msg) => {
    //     this.clientRef.sendMessage('/hello', msg);
    // }

    render() {


        if (this.state.merchantName === '') {
            return <Redirect to='/' />;
        }

        const menu = (
            <Menu onClick={this.showConfirm}>
                <Menu.Item key="1">退出登录</Menu.Item>
            </Menu>
        );
        return (
            <div>

                {/* <SockJsClient url='http://localhost:7001/endpoint' topics={['/topic/hello']}
                    // onMessage={(msg) => { alert(msg); }}
                    ref={(client) => { this.clientRef = client }} />

                <SockJsClient url='http://localhost:7001/endpoint' topics={['/queue/1/queue/hello']}
                    // onMessage={(msg) => { alert(msg); }}
                    ref={(client) => { this.clientRef = client }} /> */}


                <Layout>

                    <div>
                        <SockJsClient url='http://localhost:8001/endpoint' topics={['/topic/broadcastMsg']}
                            onMessage={(msg) => { message.info("[全站广播消息]" + msg, 5); }}
                            ref={(client) => { this.clientRef = client }} />
                    </div>

                    <div>
                        <SockJsClient url='http://localhost:7001/endpoint' topics={['/user/' + this.state.merchantId + '/merchant/info']}
                            onMessage={(msg) => { message.info(msg, 5); }}
                            ref={(client) => { this.clientRef = client }} />
                    </div>

                    <div>
                        <SockJsClient url='http://localhost:8001/endpoint' topics={['/user/' + this.state.merchantId + '/merchant/banned']}
                            onMessage={this.receiveMsg}
                            ref={(client) => { this.clientRef = client }} />
                    </div>
                    <Header className="header">
                        <div className="logo" />
                        <div className="show">【商家——后台管理界面】</div>
                        <Dropdown overlay={menu} placement="bottomRight" className="user">
                            <Button >你好！{this.state.merchantName}</Button>
                        </Dropdown>

                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" title={<span onClick={e => {
                                    this.initMsg();

                                    this.setState({
                                        breadcrumb: ["产品管理"]
                                    })
                                }}><Icon type="shopping" />产品管理</span>}>
                                    {
                                        this.state.productMange.map((item, index) => {
                                            return <Menu.Item key={index + 100} onClick={e => {
                                                //传递子组件需要指定key
                                                this.setState({
                                                    breadcrumb: ["产品管理", item],
                                                    PublicContent: <PublicContent key={index + 100} index={index} item={this.state.productMange[index]}></PublicContent>
                                                });


                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="sub2" title={<span onClick={e => {
                                    this.initMsg();
                                    this.setState({
                                        breadcrumb: ["订单管理"],

                                    })
                                }}><Icon type="shopping-cart" />订单管理</span>}>
                                    {
                                        this.state.orderMange.map((item, index) => {
                                            return <Menu.Item key={index + 200} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["订单管理", item],
                                                    PublicContent: <PublicContent key={index + 200} item={this.state.orderMange[index]}></PublicContent>
                                                })
                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>


                                <SubMenu key="sub3" title={<span onClick={e => {
                                    this.initMsg();
                                    this.setState({
                                        breadcrumb: ["消息提示"],

                                    })
                                }}><Icon type="bell" />消息提示<Badge count={this.state.count} style={{ marginLeft: '20%', marginBottom: '20%' }} /></span>} >
                                    {
                                        this.state.msgInfo.map((item, index) => {
                                            return <Menu.Item key={index + 400} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["消息提示", item],
                                                    PublicContent: <PublicContent key={index + 400} item={this.state.msgInfo[index]}></PublicContent>
                                                })
                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="sub4" title={<span onClick={e => {
                                    this.initMsg();
                                    this.setState({
                                        breadcrumb: ["个人信息管理"]
                                    })
                                }}><Icon type="user" />个人信息管理</span>}>
                                    {
                                        this.state.selfMange.map((item, index) => {
                                            return <Menu.Item key={index + 300} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["个人信息管理", item],
                                                    PublicContent: <PublicContent key={index + 300} item={this.state.selfMange[index]}></PublicContent>
                                                })
                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>

                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                {
                                    this.state.breadcrumb.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }

                            </Breadcrumb>
                            <Content style={{
                                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                            }}
                            >
                                {
                                    this.state.PublicContent
                                }
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}


export default MerchantIndex;