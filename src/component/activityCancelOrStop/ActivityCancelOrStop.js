import React from 'react'
import { message, List, Modal, Button ,Pagination,Empty} from 'antd';
import 'antd/dist/antd.css';
import './ActivityCancelOrStop.css';
import moment from 'moment';
import ActivityUpdate from './ActivityUpdate';
const confirm = Modal.confirm;
class ActivityCancelOrStop extends React.Component {
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
            changevisible: false
        }
        this.handleOk = this.handleOk.bind(this);
        this.changehandleOk = this.changehandleOk.bind(this);
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

        fetch('/productservice/api/activity/list/normal/', {
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
                    message.error("发生了一点错误！")
                    // alert("发生了一点错误！");
                }
            })


    }

    showChangeModal = (item) => {
        this.setState({
            changevisible: true,
            tmpdata: item
        });
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

    changehandleOk = (e)=>{
        console.log(e);
        this.componentDidMount();
        this.setState({
            changevisible: false,
        });
    }

    showStop(item, index) {


        confirm({
            title: '确认结束么？',
            content: '',
            cancelText: '取消',
            okText: '确认',
            onOk: () => {
                const activity_id = item.activity_ID;
                fetch('/productservice/api/activity/' + activity_id + '/stop/', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.code === 200) {
                            message.success("活动结束成功！");
                            // alert("活动结束成功！");
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
                            message.error("发生了一点错误");
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

    showDelete(item,index) {
        confirm({
            title: '确认删除么？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {

                const activity_id = item.activity_ID;
                fetch('/productservice/api/activity/' + activity_id + '/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.code === 200) {
                            message.success("活动删除成功！");
                            // alert("活动删除成功！");
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
            message.info("没有活动信息！");
            return <Empty />;
        }
        return (
            <div>
            <List itemLayout="horizontal" dataSource={this.state.tmpdataList}
                renderItem={(item,index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="#">{item.activity_Name}</a>}
                            description={<span><Button onClick={this.showModal.bind(this,item)}>详&nbsp;&nbsp;情</Button>&nbsp;&nbsp;<Button type="primary" ghost onClick={this.showChangeModal.bind(this,item)}>修&nbsp;&nbsp;改</Button>&nbsp;&nbsp;</span>}
                        />
                    </List.Item>
                )
                }
            >
            </List>

            <Modal
                title="团购活动信息"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleOk}
                okText="确认"
                cancelText="关闭"
            >

                <p><span className='tip'>活动名称：</span><span className='value'>{this.state.tmpdata.activity_Name}</span></p>
                <p><span className='tip'>活动介绍：</span><span className='value'>{this.state.tmpdata.activity_Introduction}</span></p>
                <p><span className='tip'>活动开始时间：</span><span className='value'>{moment(this.state.tmpdata.beginDate).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                <p><span className='tip'>活动结束时间：</span><span className='value'>{moment(this.state.tmpdata.endDate).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                

            </Modal>


            <Modal
                title="团购活动修改"
                visible={this.state.changevisible}
                onOk={this.changehandleOk}
                onCancel={this.changehandleOk}
                okText="取消"
                cancelText="退出界面"
            >

                <ActivityUpdate key={Math.random()} data={this.state.tmpdata}></ActivityUpdate>
                

            </Modal>


            <Pagination style={{textAlign: 'center'}}  defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />
            </div>
        );
    }
}

export default ActivityCancelOrStop;