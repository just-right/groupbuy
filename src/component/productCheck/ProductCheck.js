import React from 'react'
import { message, List, Button, Modal, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import './ProductCheck.css';
import OSS from 'ali-oss';
import moment from 'moment';
const confirm = Modal.confirm;

class ProductCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tmpdata: [],
            count: 0,
            page: 8,
            pageNumber: 1,
            tmpdataList: [],
            visible: false,
            emptyFlag: false,
            activityName: '',
            storeName: '',
            categoryName: '',
            imgContent: ''
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

        fetch('/productservice/api/product/list/check/', {
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
            });

    }

    showModal = (item) => {
        const activity_id = item.activity_id;
        const merchant_id = item.merchant_id;


        fetch('/productservice/api/activity/' + activity_id + '/', {
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
                        activityName: data.data.activity_Name
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });

        fetch('/userservice/api/merchant/' + merchant_id + '/normal', {
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
                        storeName: data.data.store_Name
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });

        const client = new OSS({
            accessKeyId: 'LTAIqkb70CWOaqiJ',
            accessKeySecret: 'yiJIbuKU25Px0LSDLqEcFp8aqjX8bW',
            bucket: 'microservice-img-store',
            region: 'oss-cn-beijing',
        });
        const key = item.image_url;

        client.getACL(key);
        client.putACL(key, 'public-read');
        const url = 'http://microservice-img-store.oss-cn-beijing.aliyuncs.com/' + key;

        this.setState({
            visible: true,
            tmpdata: item,
            categoryName: item.productcategory.category_name,
            imgContent: url
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
            title: '确认通过么？',
            content: '',
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                const product_id = item.product_id;
                fetch('/productservice/api/product/' + product_id + '/check/', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.code === 200) {
                            message.success("通过成功！");
                            // alert("通过成功！");
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

    showDeleteConfirm(item, index) {
        confirm({
            title: '确认不通过么？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {

                const product_id = item.product_id;
                fetch('/productservice/api/product/' + product_id + '/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.code === 200) {
                            message.success("不通过成功！");
                            // alert("不通过成功！");
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
        });
    }

    render() {
        if (this.state.emptyFlag) {
            message.info("没有产品审核信息！");
            return <Empty />;
        }
        return (
            <div>
                <List itemLayout="horizontal" dataSource={this.state.tmpdataList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="#">{item.product_name}</a>}
                                description={<span><Button onClick={this.showModal.bind(this, item)}>详&nbsp;&nbsp;情</Button>&nbsp;&nbsp;<Button type="primary" ghost onClick={this.showConfirm.bind(this, item, index)}>通&nbsp;&nbsp;过</Button>&nbsp;&nbsp;<Button type="danger" ghost onClick={this.showDeleteConfirm.bind(this, item, index)}>不通过</Button></span>}
                            />
                        </List.Item>
                    )
                    }
                >
                </List>
                <Modal
                    title="产品信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    okText="确认"
                    cancelText="关闭"
                >

                    <p><span className='tip'>产品名称：</span><span className='value'>{this.state.tmpdata.product_name}</span></p>
                    <p><span className='tip'>所属店铺：</span><span className='value'>{this.state.storeName}</span></p>
                    <p><span className='tip'>所属活动：</span><span className='value'>{this.state.activityName}</span></p>
                    <p><span className='tip'>所属类别：</span><span className='value'>{this.state.categoryName}</span></p>
                    <p><span className='tip'>产品照片：</span><img key={Math.random()} className="img" src={this.state.imgContent} /></p>
                    <p><span className='tip'>产品介绍：</span><span className='value'>{this.state.tmpdata.product_introduction}</span></p>
                    <p><span className='tip'>产品价格：</span><span className='value'>{this.state.tmpdata.product_price}</span></p>

                    <p><span className='tip'>产品库存：</span><span className='value'>{this.state.tmpdata.product_amount}</span></p>
                    <p><span className='tip'>成团数量：</span><span className='value'>{this.state.tmpdata.clusternumber}</span></p>
                    <p><span className='tip'>最多购买数量：</span><span className='value'>{this.state.tmpdata.limitamount}</span></p>
                </Modal>
                <Pagination style={{textAlign: 'center'}}  defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
            </div>
        );
    }
}

export default ProductCheck;