import React from 'react'
import { message, List, Modal, Button, Form, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import './CategoryManage.css';
import CategoryUpdate from "../categoryUpdate/CategoryUpdate";
import moment from 'moment';
const confirm = Modal.confirm;

class CategoryManage extends React.Component {
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
            visible: false,
            updatevisible: false,
            newCategoryName: '',
            category: <></>
        }
        this.handleOk = this.handleOk.bind(this);
        this.updatehandleOk = this.updatehandleOk.bind(this);
        this.updatehandleCancel = this.updatehandleCancel.bind(this);
        this.validateUpdateCategoryName = this.validateUpdateCategoryName.bind(this);
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

        fetch('/productservice//api/category/list/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.code === 200) {
                    const flag = data.data.rows.length === 0 ? true : false;
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

    updatehandleOk = (e) => {


        const category_name = this.state.newCategoryName;
        const category_id = this.state.tmpdata.category_ID;

        if (category_name !== '') {

            //是否能优化传递参数方式
            const addUrl = '?category_name=' + category_name;
            fetch('/productservice/api/category/' + category_id + '/update/' + addUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.code === 200) {

                        this.setState({
                            updatevisible: false,
                            newCategoryName: '',
                            category: <></>

                        })
                        message.success("修改成功！");
                        // alert("修改成功！");
                        this.componentDidMount();
                    }
                    else {

                        this.setState({
                            updatevisible: false,
                            newCategoryName: '',
                            category: <></>
                        })
                        message.error("修改失败！");
                        // alert("修改失败！");
                    }
                })
        }
        else {
            this.setState({
                newCategoryName: '',
            })
            message.error("请完善相关信息！");
            // alert("请完善相关信息！");
        }







    }

    updatehandleCancel = (e) => {
        console.log(e);
        this.setState({
            updatevisible: false,
        });
    }


    showDeleteConfirm(item, index) {
        confirm({
            title: '确认删除么？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {

                const category_id = item.category_ID;
                fetch('/productservice/api/category/' + category_id + '/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.code === 200) {
                            message.success("删除成功！");
                            // alert("删除成功！");
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

    showUpdate(item, index) {
        this.setState({
            updatevisible: true,
            category: <CategoryUpdate key={index} item={item} validateUpdateCategoryName={this.validateUpdateCategoryName}></CategoryUpdate>,
            tmpdata: item
        });
    }

    validateUpdateCategoryName = (rule, value, callback) => {
        if (value) {
            if (value.length < 2 || value.length > 20) {
                this.setState({
                    newCategoryName: ''
                });
                callback("类别名称长度在2-20之间！");
            }
            else {
                const addUrl = '?category_name=' + value;
                fetch('/productservice/api/category/create/checkby/categoryname' + addUrl, {
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
                                newCategoryName: ''
                            });
                            callback("类别已存在或与旧类别名相同！");
                        }
                        else {
                            this.setState({
                                newCategoryName: value
                            });

                            callback();
                        }
                    })
            }
        }
        else {
            this.setState({
                newCategoryName: ''
            });
            callback();
        }

    }



    render() {
        if (this.state.emptyFlag) {
            message.info("没有类别信息！");
            return <Empty />;
        }
        return (
            <div>
                <List itemLayout="horizontal" dataSource={this.state.tmpdataList}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href="#">{item.category_Name}</a>}
                                description={<span><Button onClick={this.showModal.bind(this, item)}>详&nbsp;&nbsp;情</Button>&nbsp;&nbsp;<Button type="primary" ghost onClick={this.showUpdate.bind(this, item, index)}>修&nbsp;&nbsp;改</Button>&nbsp;&nbsp;</span>}
                            />
                        </List.Item>
                    )
                    }
                >
                </List>
                <Modal
                    title="类别信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    okText="确认"
                    cancelText="关闭"
                >

                    <p><span className='tip'>类别名：</span><span className='value'>{this.state.tmpdata.category_Name}</span></p>
                    <p><span className='tip'>创建时间：</span><span className='value'>{moment(this.state.tmpdata.createDate).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                    <p><span className='tip'>最近一次更新时间：</span><span className='value'>{this.state.tmpdata.updateDate !== null ? moment(this.state.tmpdata.updateDate).format('YYYY-MM-DD HH:mm:ss') : ''}</span></p>


                </Modal>

                <Modal
                    title="修改类别名称"
                    visible={this.state.updatevisible}
                    onOk={this.updatehandleOk}
                    onCancel={this.updatehandleCancel}
                    okText="确认修改"
                    cancelText="取消"
                >
                    {
                        this.state.category
                    }

                </Modal>
                <Pagination style={{ textAlign: 'center' }} defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />

            </div>
        );
    }
}
export default CategoryManage;