import React from 'react';
import 'antd/dist/antd.css';
import './UserInfo.css';
import cookie from 'react-cookies';
import User from './User';
import UserUpdate from './UserUpdate';
import Address from "./Address";
import { Tabs, Icon, message, Empty, List, Row, Col, Button, Pagination, InputNumber, Modal } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userId: '',
        }
    }


    componentWillMount() {
        if (cookie.load('userId')) {
            const id = cookie.load('userId');
            this.setState({
                userId: id,
            })
        }
    }
    render() {
        if(this.state.userId === ''){
            message.info("请先登录！");
            return <Empty></Empty>;
        }
        return (
            <Tabs defaultActiveKey="1" style={{textAlign: 'center'}}>
                <TabPane tab={<span><Icon type="contacts" theme="twoTone" />个人信息</span>} key="1">
                   <User key={Math.random} id={this.state.userId}></User>
                </TabPane>
                <TabPane tab={<span><Icon type="edit" theme="twoTone" />个人信息修改</span>} key="2">
                    <UserUpdate key={Math.random} id={this.state.userId}></UserUpdate>
                </TabPane>
                <TabPane tab={<span><Icon type="home" theme="twoTone" />收货地址</span>} key="3">
                     <Address key={Math.random} id={this.state.userId}></Address>
                </TabPane>
            </Tabs> 
        );
    }
}
export default UserInfo;