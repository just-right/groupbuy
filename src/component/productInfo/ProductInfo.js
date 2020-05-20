import React from 'react';
import './ProductInfo.css';
import { Button, Col } from 'antd';
class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            detail: <></>,
            detailFlag: false
        }
        this.detailClick = this.detailClick.bind(this);
    }
    componentDidMount() {
        const item = this.props.item;
        this.setState({
            product: item,
        })
    }

    detailClick() {
        this.props.detail(this.state.product);
    }

    render() {

     
            return (<Col className="gutter-row" span={6}>
                <img className="productimg" src={'http://microservice-img-store.oss-cn-beijing.aliyuncs.com/' + this.state.product.image_url}></img>

                <div className="info"><span >{this.state.product.product_name}</span>
                    <span >&nbsp;&nbsp;&nbsp;&nbsp;价格：￥{this.state.product.product_price}/Kg</span></div>
                <div className="btn">
                    <Button onClick={this.detailClick}>查看详情</Button>
                </div>

            </Col>)
        
    }
}
export default ProductInfo;