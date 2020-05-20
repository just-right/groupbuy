import React from 'react'
import { Layout, Menu, Dropdown, Button, Input, Modal, Badge, message } from 'antd';
import './ShoppingIndex.css';
import 'antd/dist/antd.css';
import PublicContent from './PublicContent';
import { Redirect } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import cookie from 'react-cookies';
const Search = Input.Search;
const { Header, Content, Footer } = Layout;
const confirm = Modal.confirm;
class ShoppingIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NavList: ["主页", "产品", "购物车", "个人中心", "消息提示", "订单中心"],
            orderList: [],
            userInfo: [],
            address: '',
            addressList: [],
            shoppingCartList: [],
            publicContent: <></>,
            loginFlag: false,
            userName: '',
            tip: '请先登录！',
            loginTip: '去登录',
            municipalityFlag: '0',
            msgFlag: false,
            length: '',
            userId: '',
        }
        this.signOutClick = this.signOutClick.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.updateMsg = this.updateMsg.bind(this);
        this.receiveMsg = this.receiveMsg.bind(this);
    }

    componentDidMount() {

        if (cookie.load('userName')) {

            const name = cookie.load('userName');
            const tip = '欢迎您！' + name;

            const id = cookie.load('userId');
            const addUrl = '?id=' + id + '&flag=1';
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
                        const flag = data.msgList.length === 0 ? false : true;

                        this.setState({
                            msgFlag: flag,
                            length: data.msgList.length,
                            userId: id,
                        })



                    }
                    else {
                        message.error("发生了一点错误！");
                    }
                })


            this.initAddress(id);


            this.setState({
                userName: name,
                tip: tip,
                loginTip: '退出登录'
            })


        }
        else {
            this.initAddressByIp();

        }



    }
    receiveMsg(msg){
        message.info(msg,5);
        cookie.remove('userId', { path: '/' });
        cookie.remove('userName', { path: '/' });
        cookie.remove('userPassword', { path: '/' });
        this.setState({
            merchantName: '',
            loginFlag: true
        });
    }

    // componentDidMount() {
    //     // alert(this.state.address);
    //     this.setState({
    //         publicContent: <PublicContent key={Math.random()} item={this.state.NavList[0]} address={this.state.address} municipalityFlag={this.state.municipalityFlag}></PublicContent>,
    //     })
    // }

    updateMsg() {
        if (cookie.load('userName')) {
            const id = cookie.load('userId');
            const addUrl = '?id=' + id + '&flag=1';
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
                        const flag = data.msgList.length === 0 ? false : true;

                        this.setState({
                            msgFlag: flag,
                            length: data.msgList.length,
                        })
                    }
                    else {
                        message.error("发生了一点错误！");
                    }
                })

        }
        else {


        }
    }


    initAddressByIp() {

        fetch('https://restapi.amap.com/v3/ip?key=f7c71e15eac1a97af978f8203f8eb026', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 1) {


                    const address = data.province + ',' + data.city;
                    const flag = data.province === data.city ? '1' : '0';


                    this.setState({
                        address: address,
                        municipalityFlag: flag,
                    })

                    this.setState({
                        publicContent: <PublicContent key={Math.random()} item={this.state.NavList[0]} address={address} municipalityFlag={flag}></PublicContent>,
                    })


                    // const res = address + flag;
                    // message.info(res);
                    // return address + flag;
                }

                else {
                    message.error("发生了一点错误！");
                }
            })


    }

    initAddress(id) {

        fetch('/userservice/api/user/' + id + '/normal', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {


                    const address = data.data.address;

                    // setTimeout(() => {
                    //     this.setState({
                    //         address: address,

                    //     })
                    // },0)


                    this.setState({
                        address: address,

                    })
                    this.setState({
                        publicContent: <PublicContent key={Math.random()} item={this.state.NavList[0]} address={address} municipalityFlag={"0"}></PublicContent>,
                    })


                    // message.info(this.state.address);

                    // const res = address + "0";
                    // message.info(res);
                    // message.info(address + "0");
                    // return address + "0";

                }

                else {
                    message.error("发生了一点错误！");
                }
            })

    }


    searchClick(value) {
        // alert(value);
        if (value !== '') {
            this.setState({
                publicContent: <PublicContent key={200 + Math.random()} item={'搜索'} searchValue={value} address={this.state.address} municipalityFlag={this.state.municipalityFlag}></PublicContent>,
            })
        }
        else {
            message.error("请输入搜索内容！");
        }
    }

    signOutClick() {
        const tip = this.state.loginTip === '退出登录' ? '确定退出登录么？' : '确定去登录？';
        confirm({
            title: tip,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                cookie.remove('userId', { path: '/' });
                cookie.remove('userName', { path: '/' });
                cookie.remove('userPassword', { path: '/' });
                this.setState({
                    merchantName: '',
                    loginFlag: true
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }





    render() {

        if (this.state.loginFlag) {
            return <Redirect to='/login'></Redirect>;
        }
        const menu = (
            <Menu onClick={this.showConfirm}>
                <Menu.Item key="6" onClick={this.signOutClick} style={{ textAlign: "center", }}>{this.state.loginTip}</Menu.Item>
            </Menu>
        );
        return (



            <Layout>


                <div>
                    <SockJsClient url='http://localhost:8001/endpoint' topics={['/topic/broadcastMsg']}
                        onMessage={(msg) => { message.info("[全站广播消息]" + msg, 5); }}
                        ref={(client) => { this.clientRef = client }} />
                </div>
                <div>
                    <SockJsClient url='http://localhost:7001/endpoint' topics={['/user/' + this.state.userId + '/user/info']}
                        onMessage={(msg) => { message.info(msg, 5); }}
                        ref={(client) => { this.clientRef = client }} />
                </div>

                <div>
                    <SockJsClient url='http://localhost:8001/endpoint' topics={['/user/' + this.state.userId + '/user/banned']}
                        onMessage={this.receiveMsg}
                        ref={(client) => { this.clientRef = client }} />
                </div>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <div className="address">
                        <span>您的地址：{this.state.address}</span>
                    </div>
                    <div className="tip">
                        <Menu

                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['0']}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                this.state.NavList.map((item, index) => {
                                    return <Menu.Item key={index} onClick={e => {
                                        this.updateMsg();
                                        this.setState({
                                            publicContent: <PublicContent key={index + 100} item={this.state.NavList[index]} address={this.state.address} municipalityFlag={this.state.municipalityFlag} ></PublicContent>
                                        });
                                    }}>
                                        {


                                            index === 4 & this.state.msgFlag ? <span>{item}<Badge count={this.state.length} style={{ marginLeft: '25%', marginBottom: '25%' }} /></span> : item

                                        }


                                    </Menu.Item>
                                })


                            }
                            <Menu.Item >
                                <Search
                                    style={{ marginTop: '7%' }}
                                    placeholder="买点东西享受一下！"
                                    onSearch={this.searchClick}
                                    enterButton
                                ></Search>
                            </Menu.Item>

                        </Menu>

                    </div>
                    <div>
                        <Dropdown overlay={menu} placement="bottomRight" className="user">
                            <Button >{this.state.tip}</Button>
                        </Dropdown>
                    </div>



                </Header>


                <Content style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>

                    <div>
                        {
                            this.state.publicContent

                        }
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    小区生鲜团购商城 ©2019 Created by Luffy
            </Footer>
            </Layout>
        );
    }
}
export default ShoppingIndex;