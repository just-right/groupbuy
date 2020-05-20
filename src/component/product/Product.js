import React from 'react';
import './Product.css';
import 'antd/dist/antd.css';
import ProductDetail from '../productInfo/ProductDetail';
import { Row, Icon, Carousel, Modal, message, Pagination, Layout, List, Button, Empty } from 'antd';
import ProductInfo from '../productInfo/ProductInfo';
const {
    Header, Footer, Sider, Content,
} = Layout;
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            tmpProductList: [],
            category: [],
            count: 0,
            page: 8,
            detail: <></>,
            detailFlag: false

        }
        this.pageChange = this.pageChange.bind(this);

    }

    init() {


        const address = this.props.address;
        const municipalityFlag = this.props.municipalityFlag;

        // message.info(address);
        const addUrl = "?address=" + address + "&municipalityFlag=" + municipalityFlag;
        fetch('/publicservice/api/product/list/normal/' + addUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    this.setState({
                        count: data.data.count,
                        productList: data.data.rows,
                        tmpProductList: data.data.rows.slice(0, 8)
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            });

        fetch('/productservice/api/category/list/', {
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
                        category: data.data.rows
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            })



    }

    componentDidMount() {
        this.init();
    }

    pageChange(page) {
        const start = (page - 1) * this.state.page;
        const end = start + this.state.page;
        const productList = this.state.productList.slice(start, end);
        this.setState({
            tmpProductList: productList
        });
    }

    detailClick(item) {

        this.setState({
            detail: <ProductDetail key={Math.random()} item={item}></ProductDetail>,
            detailFlag: true
        })
    }
    categoryClick(item) {
        const category_id = item.category_ID;

        const address = this.props.address;
        const municipalityFlag = this.props.municipalityFlag;
        const addUrl = "?address=" + address + "&municipalityFlag=" + municipalityFlag;

        fetch('/productservice/api/product/get/list/' + category_id + '/' + addUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    this.setState({
                        count: data.data.count,
                        productList: data.data.rows,
                        tmpProductList: data.data.rows.slice(0, 8)
                    });
                }
                else {
                    message.error("发生了一点错误！");
                    // alert("发生了一点错误！");
                }
            })
    }

    render() {
        if (this.state.detailFlag) {
            return this.state.detail;
        }
        return (
            <Layout>
                <Layout>
                    <Sider className="sider">  <List
                        header={<div style={{ textAlign: "center", }}>产品类别</div>}
                        footer={<div><Icon type="info-circle" theme="twoTone" />&nbsp;&nbsp;更多类别即将上线<Icon type="ellipsis" /></div>}
                        bordered
                        dataSource={this.state.category}
                        renderItem={item => (<List.Item><Icon type="tag" theme="twoTone" />&nbsp;&nbsp;<Button onClick={this.categoryClick.bind(this, item)}>{item.category_Name}</Button></List.Item>)}
                    />
                    </Sider>

                    {
                        this.state.count === 0 ? <Content className="content"><Empty></Empty>  </Content> : <Content className="content"><div className="welcome"><span >欢迎来到小区生鲜团购商城</span></div>
                            <Row gutter={16}>

                                {
                                    this.state.tmpProductList.map((item, index) => {
                                        return <ProductInfo key={index + Math.random()} item={item} detail={this.detailClick.bind(this, item)}></ProductInfo>
                                    })
                                }
                            </Row>

                            <div className="page">
                                <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                            </div>
                        </Content>
                    }


                </Layout>
            </Layout>
        );
    }

}
export default Product;