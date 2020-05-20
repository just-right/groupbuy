import React from 'react';
import { Row, Col, message, Icon, List, Button, Modal,Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import AddressCreate from './AddressCreate';
import AddresUpdate from './AddresUpdate';
const confirm = Modal.confirm;
class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            visible: false,
            changevisible: false,
            addressList: [],
            tmpAddressList: [],
            count: 0,
            page: 8,
            pageNumber: 1,
            address: [],
            // emptyFlag: false
            
        }
        this.pageChange = this.pageChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.id;
        fetch('/userservice/api/address/list/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    // const flag = data.data.rows.length === 0?true:false;
                    this.setState({
                        userid: id,
                        addressList: data.data.rows,
                        tmpAddressList: data.data.rows.slice(0, 8),
                        count: data.data.count,
                     
                    })
                }

                else {
                    message.error("发生了一点错误！");
                }
            })
    }

    
    pageChange(page) {

        const start = (page - 1) * this.state.page;
        const end = start + this.state.page;
        const addressList = this.state.addressList.slice(start, end);
        this.setState({
            tmpAddressList: addressList,
            pageNumber: page
        });
    }

    deletClick(index){
        confirm({
            title: '确认删除么？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const start = (this.state.pageNumber - 1) * this.state.page;
                const end = start + this.state.page;
                const address_id = this.state.addressList[this.state.page * (this.state.pageNumber - 1) + index].address_ID;
                fetch('/userservice/api/shippingaddress/' + address_id + '/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            this.state.addressList.splice(this.state.page * (this.state.pageNumber - 1) + index, 1);
                            

                            const tmpAddressList = this.state.addressList.slice(start, end)

                            const count = this.state.count - 1;
                            this.setState({
                                tmpAddressList: tmpAddressList,
                                count: count,
                            })
                            message.success("删除成功！");
                        }

                        else {
                            message.error("发生了一点错误！");
                        }
                    })

            },
            onCancel() {
                console.log('Cancel');
            },
        });


    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    showChangeModal(index){
        const address = this.state.addressList[this.state.page * (this.state.pageNumber - 1) + index];
        this.setState({
            changevisible: true,
            address: address
        });
    }



    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            changevisible: false,
        });
        this.componentDidMount();
    }

    render() {
        // if(this.state.emptyFlag){
        //     message.info("没有收货地址！");
        //     return <Empty />;
        // }
        return (
            <div>
                <List
                    size="large"
                    header={
                        <div className="gutter-example">
                            <Row gutter={20} justify="center">
                                <Col className="gutter-row" span={5}>
                                    <div className="gutter-box">联系人</div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div type="primary">收货地址</div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div type="primary" >联系电话</div>
                                </Col>
                                <Col className="gutter-row" span={5}>
                                    <div type="primary" >操作</div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <Button type="primary" onClick={this.showModal}>新增收货地址</Button>
                                </Col>
                            </Row>
                        </div>

                    }
                    footer={<div>别忘了给好朋友买点好吃的</div>}
                    bordered>

                    {
                
                        this.state.addressList.map((item, index) => {
                            return <List.Item key={Math.random()}>
                                <div className="gutter-example">
                                    <Row gutter={20} justify="center">
                                        <Col className="gutter-row" span={5}>
                                            <div className="gutter-box"><span>&nbsp;&nbsp;{item.receipt_Contacts}</span></div>
                                        </Col>
                                        <Col className="gutter-row" span={5}>
                                            <div className="gutter-box"><span>&nbsp;&nbsp;{item.address}</span></div>
                                        </Col>
                                        <Col className="gutter-row" span={5}>
                                            <div className="gutter-box"><span>&nbsp;&nbsp;{item.telephoneNumber}</span></div>
                                        </Col>
                                        <Col className="gutter-row" span={5}>
                                            <div className="gutter-box"><Button type="danger" onClick={this.deletClick.bind(this, index)}>删除</Button>&nbsp;&nbsp;<Button type="primary" onClick={this.showChangeModal.bind(this,index)}>修改</Button></div>
                                        </Col>
                                    </Row>
                                </div>


                            </List.Item>
                            // return<List.Item key={index}><span>{item.product_name}</span><span>{item.product_price}</span><span>{item.order_amount}</span><span>{item.order_money}</span></List.Item>;
                        })
                    }



                </List>
                <div className="page">
                        <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                </div>

                <Modal
                    title="新增收货地址"
                    visible={this.state.visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="退出界面"
                >
                    {
                        <AddressCreate key={Math.random()} id={this.state.userid}></AddressCreate>
                    }
                </Modal>


                <Modal
                    title="修改收货地址"
                    visible={this.state.changevisible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="退出界面"
                >
                    {
                        <AddresUpdate key={Math.random()} id={this.state.userid} address={this.state.address}></AddresUpdate>
                    }
                </Modal>








            </div>
        );
    }

}

export default Address;