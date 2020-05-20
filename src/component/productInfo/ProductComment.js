import React from 'react';
import 'antd/dist/antd.css';
import { Empty, List, Avatar, Pagination, message,Rate } from 'antd';
import './ProductInfo.css';
import moment from 'moment';
class ProductComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: '',
            commentList: [],
            count: '',
            page: 8,
            pageNumber: 1,
            tmpCommentList: [],
            emptyFlag: false
        }
        this.pageChange = this.pageChange.bind(this);
    }


    pageChange(page) {

        const start = (page - 1) * this.state.page;
        const end = start + this.state.page;
        const tmpCommentList = this.state.commentList.slice(start, end);
        this.setState({
            tmpCommentList: tmpCommentList,
            pageNumber: page
        });
    }



    componentWillMount() {
        const id = this.props.id;
        this.setState({
            product_id: id,
        })

        fetch('/orderservice/api/comment/list/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    const list = data.data.rows;
                    const count = data.data.count;
                    const flag = list.length === 0 ? true : false;
                    this.setState({
                        commentList: list,
                        tmpCommentList: data.data.rows.slice(0, 8),
                        count: count,
                        emptyFlag: flag
                    })
                }

                else {
                    message.error("发生了一点错误！");
                }
            })

    }

    render() {
        if (this.state.emptyFlag) {
            message.info("没有评价信息！");
            return <Empty />;
        }
        return (<div><List
            style={{ marginLeft: '40%' }}
            // itemLayout="vertical"
            dataSource={this.state.tmpCommentList}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        }
                        title={<span style={{ float: 'left' }}>用户匿名&nbsp;&nbsp;发表于：{moment(item.comment_Date).format('YYYY-MM-DD HH:mm:ss')}</span>}
                        description={<span style={{ float: 'left', marginTop: '2%', marginLeft: '-24%' }}>  <Rate value={item.score} disabled={true}/>{item.comment_Content}</span>}
                    />
                </List.Item>
            )}
        />

            <Pagination defaultCurrent={1} showQuickJumper={true} onChange={this.pageChange} total={this.state.count / (this.state.page / 10)} />

        </div>);
    }
}

export default ProductComment;