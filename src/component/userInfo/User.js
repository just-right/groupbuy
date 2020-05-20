import React from 'react';
import { Card, message,Icon } from 'antd';
import 'antd/dist/antd.css';
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            user: [],
        }
    }

    componentDidMount() {
        const id = this.props.id;
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
                    this.setState({
                        userid: id,
                        user: data.data,
                    })
                }

                else {
                    message.error("发生了一点错误！");
                }
            })
    }

    render() {
        return (
            <div style={{ background: '#ECECEC' }}>
                <Card title="个人信息卡片" bordered={false}>
                    <div style={{textAlign: 'left',marginLeft: '45%'}}>
                        <p><Icon type="idcard" theme="twoTone" />&nbsp;&nbsp;账号名称：{this.state.user.accountName}</p>
                        <p><Icon type="skin" theme="twoTone" />&nbsp;&nbsp;用户名：{this.state.user.userName}</p>
                        <p><Icon type="smile" theme="twoTone" />&nbsp;&nbsp;性别：{this.state.user.sex}</p>
                        <p><Icon type="environment" theme="twoTone" />&nbsp;&nbsp;地址：{this.state.user.address}</p>
                        <p><Icon type="phone" theme="twoTone" />&nbsp;&nbsp;电话号码：{this.state.user.telephoneNumber}</p>
                        <p><Icon type="dashboard" theme="twoTone" />&nbsp;&nbsp;注册时间：{this.state.user.registrationDate}</p>
                        <p><Icon type="plus-circle" theme="twoTone" />&nbsp;&nbsp;用户等级：{this.state.user.userLevel}</p>
                    </div>
                </Card>

            </div>);
    }
}
export default User;