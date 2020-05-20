import React from 'react';
import Home from "../home/Home";
import Product from "../product/Product";
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import UserInfo from '../userInfo/UserInfo';
import Order from '../order/Order';
import MessagInfo from '../messageInfo/MessagInfo';
class PublicContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            NavList: ["主页", "产品", "购物车", "个人中心", "消息提示", "订单中心"],
            content: <></>
        }
    }
    componentDidMount() {
        const content = this.props.item;
        const value = this.props.searchValue;
        const address = this.props.address;

        // alert(address);
        const municipalityFlag = this.props.municipalityFlag;
        //const index = this.props.index;
        switch (content) {
            case this.state.NavList[0]:
                this.setState({
                    content: <Home key={0} index={0} address={address} municipalityFlag={municipalityFlag}></Home>
                })
                break;
            case this.state.NavList[1]:
                this.setState({
                    content: <Product address={address} municipalityFlag={municipalityFlag}></Product>
                })
                break;
            case this.state.NavList[2]:
                this.setState({
                    content: <ShoppingCart></ShoppingCart>
                })
                break;
            case this.state.NavList[3]:
                this.setState({
                    content: <UserInfo></UserInfo>
                })
                break;
            case this.state.NavList[4]:
                this.setState({
                    content: <MessagInfo ></MessagInfo>
                })
                break;
            case this.state.NavList[5]:
                this.setState({
                    content: <Order></Order>
                })
                break;
            case '搜索':
                this.setState({
                    content: <Home key={1} index={1} searchValue={value} address={address} municipalityFlag={municipalityFlag}></Home>
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