import React from 'react';
import './home.css';
import 'antd/dist/antd.css';
import { Row, Empty, Carousel, Modal, message, Pagination } from 'antd';
import one from './one.jpg';
import two from './two.jpg';
import three from './three.jpg';
import four from './four.jpg';
import ProductInfo from '../productInfo/ProductInfo';
import ProductDetail from '../productInfo/ProductDetail';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            tmpProductList: [],
            count: 0,
            page: 8,
            // municipalityFlag: '',
            // address: '',
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



    }


    searchInit() {
        const value = this.props.searchValue;
        // message.info(address);
        const address = this.props.address;
        const municipalityFlag = this.props.municipalityFlag;

        // message.info(address);
        const addUrl = "&address=" + address + "&municipalityFlag=" + municipalityFlag;
        fetch('/publicservice/api/product/search/list/?keyword=' + value + addUrl, {
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



    }


    componentDidMount() {
        const index = this.props.index;



        if (index === 0) {
            this.init();
        }
        else if (index === 1) {
            
            this.searchInit();
        }
        else {
            this.init();
        }
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



    render() {
        if (this.state.productList.length === 0) {
            return <div style={{ marginTop: '5%' }}><Empty /></div>;
        }
        if (this.state.detailFlag) {
            return this.state.detail;
        }
        return (
            <div>

                <div className="show">
                    <Carousel autoplay>
                        <div><img src={one} className="img"></img></div>
                        <div><img src={two} className="img"></img></div>
                        <div><img src={three} className="img"></img></div>
                        <div><img src={four} className="img"></img></div>
                    </Carousel>
                </div>

                <div className="gutter-example">
                    <Row gutter={16}>

                        {
                            this.state.tmpProductList.map((item, index) => {
                                return <ProductInfo key={index + Math.random()} item={item} detail={this.detailClick.bind(this, item)}></ProductInfo>
                            })
                        }


                    </Row>
                </div>
                <div className="page">
                    <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
                </div>
            </div>
        );
    }

}
export default Home;