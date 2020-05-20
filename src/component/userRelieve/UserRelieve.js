import React from 'react'
import { message, List, Modal, Button ,Pagination,Empty } from 'antd';
import 'antd/dist/antd.css';
import './UserRelieve.css';

import moment from 'moment';
const confirm = Modal.confirm;
class UserRelieve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tmpdata: [],
            count: 0,
            page: 8,
            pageNumber: 1,
            tmpdataList: [],
            emptyFlag: false,
            visible: false
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

        fetch('/userservice/api/user/list/banned', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    const flag = data.data.rows.length === 0?true:false;
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
            })


    }
    showModal = (item) => {
        this.setState({
            visible: true,
            tmpdata: item
        });


    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    showConfirm(item, index) {


        confirm({
            title: '确认解除封禁么？',
            content: '',
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                const user_id = item.user_ID;
                fetch('/userservice/api/administrator/' + user_id + '/userrelieve/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.code === 200) {
                            message.success("解除封禁成功！");
                            // alert("解除封禁成功！");
                            const tmpdata = this.state.data;
                            const tmpcount = this.state.count - 1;

                            tmpdata.splice(index, 1);
                            this.setState({
                                count: tmpcount,
                                data: tmpdata
                            })
                            this.componentDidMount();

                        }
                        else {
                            message.error("发生了一点错误！");
                            // alert("发生了一点错误！");
                        }
                    })

            },
            onCancel() {
                console.log('Cancel');
            },

        }

        );



    }

    render() {
        if (this.state.emptyFlag) {
            message.info("没有解除团长封禁信息！");
            return <Empty />;
        }
        return (
            <div>
                <List itemLayout="horizontal" dataSource={this.state.tmpdataList}
                    renderItem={(item,index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="#">{item.accountName}</a>}
                                description={<span><Button onClick={this.showModal.bind(this, item)}>详&nbsp;&nbsp;情</Button>&nbsp;&nbsp;<Button type="danger" ghost onClick={this.showConfirm.bind(this, item, index)}>解除封禁</Button></span>}
                            />
                        </List.Item>
                    )
                    }
                >
                </List>
                <Modal
                    title="用户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    okText="确认"
                    cancelText="关闭"
                >




                    <p><span className='tip'>账号：</span><span className='value'>{this.state.tmpdata.accountName}</span></p>
                    <p><span className='tip'>用户名：</span><span className='value'>{this.state.tmpdata.userName}</span></p>
                    <p><span className='tip'>性别：</span><span className='value'>{this.state.tmpdata.sex}</span></p>
                    <p><span className='tip'>地址：</span><span className='value'>{this.state.tmpdata.address}</span></p>
                    <p><span className='tip'>联系方式：</span><span className='value'>{this.state.tmpdata.telephoneNumber}</span></p>
                    <p><span className='tip'>注册时间：</span><span className='value'>{moment(this.state.tmpdata.registrationDate).format('YYYY-MM-DD HH:mm:ss')}</span></p>

                    <p><span className='tip'>用户等级：</span><span className='value'>{this.state.tmpdata.userLevel}</span></p>
                </Modal>
                <Pagination style={{textAlign: 'center'}}  defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
            </div>
        );
    }
}

export default UserRelieve;