import React from 'react';
import ProductCreate from '../../component/productManage/ProductCreate';
import ProductManage from '../../component/productManage/ProductManage';
import OrderMange from '../../component/orderManage/OrderManage';
import OrderInfo from '../../component/orderManage/OrderInfo';
import MerchantManage from '../../component/merchantInfo/MerchantManage';
import MerchantInfo from '../../component/merchantInfo/MerchantInfo';
import MessagInfo from '../messageInfo/MessagInfo';
import SigningReminder from '../SigningReminder/SigningReminder';
class PublicContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productMange: ["上架产品", "修改&下架产品"],
            orderMange: ["订单信息", "确认&取消订单", "提醒用户签收"],
            msgInfo: ["消息提示"],
            selfMange: ["个人信息", "个人信息修改"],
            content: <></>
        }
    }
    componentDidMount() {
        const content = this.props.item;
        //const index = this.props.index;
        switch (content) {
            case this.state.productMange[0]:
                this.setState({
                    content: <ProductCreate></ProductCreate>
                })
                break;
            case this.state.productMange[1]:
                this.setState({
                    content: <ProductManage></ProductManage>
                })
                break;
            case this.state.orderMange[0]:
                this.setState({
                    content: <OrderInfo></OrderInfo>
                })
                break;
            case this.state.orderMange[1]:
                this.setState({
                    content: <OrderMange></OrderMange>
                })
                break;

            case this.state.orderMange[2]:
                this.setState({
                    content: <SigningReminder></SigningReminder>
                })
                break;
            case this.state.msgInfo[0]:
                this.setState({
                    content: <MessagInfo></MessagInfo>
                })
                break;
            case this.state.selfMange[0]:
                this.setState({
                    content: <MerchantInfo></MerchantInfo>
                })
                break;
            case this.state.selfMange[1]:
                this.setState({
                    content: <MerchantManage></MerchantManage>
                })
                break;
            default:
                this.setState({
                    content: <></>
                })
        }




    }


    render() {


        return (
            <div>
                {
                    this.state.content
                }
            </div>
        )
    }

}

export default PublicContext;