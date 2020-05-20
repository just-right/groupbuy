import React from 'react';
import MerchantCheck from "../merchantRegisterCheck/MerchantCheck";
import MechantBanned from "../mechantBanned/MechantBanned";
import MerchantRelieve from "../merchantRelieve/MerchantRelieve";
import UserBanned from "../userBanned/UserBanned";
import UserCheck from "../userCheck/UserCheck";
import UserRelieve from "../userRelieve/UserRelieve";
import ActivityCancelOrStop from "../activityCancelOrStop/ActivityCancelOrStop";
import ProductCheck from "../productCheck/ProductCheck";
import ProductManage from "../productManage/ProductManage";
import CategoryManage from "../categoryManage/CategoryManage";
import ActivityCreate from "../activityCreate/ActivityCreate";
import CategoryCreate from "../categoryCreate/CategoryCreate";
import BroadcastManage from '../broadcastManage/BroadcastManage';
class PublicContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            merchatMange: ["商家注册审核", "商家封禁", "解除商家封禁"],
            userMange: ["团长注册审核", "团长封禁", "解除团长封禁"],
            activityMange: ["创建团购活动", "修改团购活动"],
            productMange: ["新产品审核", "修改&下架产品"],
            categoryMange: ["新增类别", "修改类别"],
            broadcastManage: ["发送广播消息"],
            content: <></>
        }
    }
    componentDidMount() {
        const content = this.props.item;
        //const index = this.props.index;
        switch (content) {
            case this.state.merchatMange[0]:
                this.setState({
                    content: <MerchantCheck></MerchantCheck>
                })
                break;
            case this.state.merchatMange[1]:
                this.setState({
                    content: <MechantBanned></MechantBanned>
                })
                break;
            case this.state.merchatMange[2]:
                this.setState({
                    content: <MerchantRelieve></MerchantRelieve>
                })
                break;
            case this.state.userMange[0]:
                this.setState({
                    content: <UserCheck></UserCheck>
                })
                break;
            case this.state.userMange[1]:
                this.setState({
                    content: <UserBanned></UserBanned>
                })
                break;
            case this.state.userMange[2]:
                this.setState({
                    content: <UserRelieve></UserRelieve>
                })
                break;
            case this.state.activityMange[0]:
                this.setState({
                    content: <ActivityCreate></ActivityCreate>
                })
                break;
            case this.state.activityMange[1]:
                this.setState({
                    content: <ActivityCancelOrStop></ActivityCancelOrStop>
                })
                break;
            case this.state.productMange[0]:
                this.setState({
                    content: <ProductCheck></ProductCheck>
                })
                break;
            case this.state.productMange[1]:
                this.setState({
                    content: <ProductManage></ProductManage>
                })
                break;
            case this.state.categoryMange[0]:
                this.setState({
                    content: <CategoryCreate></CategoryCreate>
                })
                break;
            case this.state.categoryMange[1]:
                this.setState({
                    content: <CategoryManage></CategoryManage>
                })
                break;
            case this.state.broadcastManage[0]:
                this.setState({
                    content: <BroadcastManage></BroadcastManage>
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
export default PublicContent;