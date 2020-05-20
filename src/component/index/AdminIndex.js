import React from 'react'
import {
    message, Layout, Menu, Breadcrumb, Icon, Dropdown, Button, Modal
} from 'antd';
import 'antd/dist/antd.css';
import './AdminIndex.css';
import PublicContent from './PublicContent';
import cookie from 'react-cookies';
import { Redirect } from 'react-router-dom';
import SockJsClient from 'react-stomp';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const confirm = Modal.confirm;


class AdminIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            merchatMange: ["商家注册审核", "商家封禁", "解除商家封禁"],
            userMange: ["团长注册审核", "团长封禁", "解除团长封禁"],
            activityMange: ["创建团购活动", "修改团购活动"],
            productMange: ["新产品审核", "修改&下架产品"],
            categoryMange: ["新增类别", "修改类别"],
            broadcastManage: ["发送广播消息"],
            breadcrumb: ["每天都是好心情！"],
            PublicContent: <PublicContent></PublicContent>,

        }
        this.showConfirm = this.showConfirm.bind(this);

    }

    componentWillMount() {
        const username = cookie.load('adminName');
        this.setState({
            username: username
        });

    }
    //高阶组件
    getForm(PublicContent, value) {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    data: value,
                }
            }

            render() {
                return <PublicContent {...this.props} data={this.state.data}></PublicContent>
            }
        };

    }

    componentDidMount() {



    }
    showConfirm() {

        confirm({
            title: '确定退出登录么？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                cookie.remove('adminId', { path: '/' });
                cookie.remove('adminName', { path: '/' });
                cookie.remove('adminPassword', { path: '/' });
                this.setState({
                    username: ''
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/hello', msg);
    }


    render() {

        if (this.state.username === '') {
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
                    onMessage={(msg) => { alert(msg); }}
                    ref={(client) => { this.clientRef = client }} /> */}
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <div className="show">【网站管理员——后台管理界面】</div>

                        <Dropdown overlay={menu} placement="bottomRight" className="adminuser">
                            <Button >你好！{this.state.username}</Button>
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

                                    this.setState({
                                        breadcrumb: ["商家管理"]
                                    })
                                }}><Icon type="user" />商家管理</span>}>
                                    {
                                        this.state.merchatMange.map((item, index) => {
                                            return <Menu.Item key={index + 100} onClick={e => {
                                                //传递子组件需要指定key
                                                this.setState({
                                                    breadcrumb: ["商家管理", item],
                                                    PublicContent: <PublicContent key={index + 100} index={index} item={this.state.merchatMange[index]}></PublicContent>
                                                });


                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="sub2" title={<span onClick={e => {

                                    this.setState({
                                        breadcrumb: ["团长管理"],

                                    })
                                }}><Icon type="contacts" />团长管理</span>}>
                                    {
                                        this.state.userMange.map((item, index) => {
                                            return <Menu.Item key={index + 200} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["团长管理", item],
                                                    PublicContent: <PublicContent key={index + 200} item={this.state.userMange[index]}></PublicContent>
                                                })
                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="sub3" title={<span onClick={e => {

                                    this.setState({
                                        breadcrumb: ["团购活动管理"]
                                    })
                                }}><Icon type="shopping-cart" />团购活动管理</span>}>
                                    {
                                        this.state.activityMange.map((item, index) => {
                                            return <Menu.Item key={index + 300} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["团购活动管理", item],
                                                    PublicContent: <PublicContent key={index + 300} item={this.state.activityMange[index]}></PublicContent>
                                                })
                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="sub4" title={<span onClick={e => {

                                    this.setState({
                                        breadcrumb: ["产品管理"]
                                    })
                                }}><Icon type="shopping" />产品管理</span>}>
                                    {
                                        this.state.productMange.map((item, index) => {
                                            return <Menu.Item key={index + 400} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["产品管理", item],
                                                    PublicContent: <PublicContent key={index + 400} item={this.state.productMange[index]}></PublicContent>
                                                })
                                            }}>{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>
                                <SubMenu key="sub5" title={<span onClick={e => {

                                    this.setState({
                                        breadcrumb: ["类别管理"]
                                    })
                                }}><Icon type="tag" />类别管理</span>}>
                                    {
                                        this.state.categoryMange.map((item, index) => {
                                            return <Menu.Item key={index + 500} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["类别管理", item],
                                                    PublicContent: <PublicContent key={index + 500} item={this.state.categoryMange[index]}></PublicContent>
                                                })
                                            }}
                                            >{item}</Menu.Item>
                                        })
                                    }
                                </SubMenu>

                                <SubMenu key="sub6" title={<span onClick={e => {

                                    this.setState({
                                        breadcrumb: ["发送广播消息"]
                                    })
                                }}><Icon type="notification" />发送广播消息</span>}>
                                    {
                                        this.state.broadcastManage.map((item, index) => {
                                            return <Menu.Item key={index + 600} onClick={e => {

                                                this.setState({
                                                    breadcrumb: ["发送广播消息", item],
                                                    PublicContent: <PublicContent key={index + 600} item={this.state.broadcastManage[index]}></PublicContent>
                                                })
                                            }}
                                            >{item}</Menu.Item>
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

export default AdminIndex;