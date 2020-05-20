import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Timeline } from 'antd';

class TimelinePage extends Component {

    render() {
        return (
            <div>
                <Timeline>
                    <Timeline.Item >Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item >Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item >
                        <p>Solve initial network problems 1</p>
                        <p>Solve initial network problems 2</p>
                        <p>Solve initial network problems 3 2015-09-01</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <p>Technical testing 1</p>
                        <p>Technical testing 2</p>
                        <p>Technical testing 3 2015-09-01</p>
                    </Timeline.Item>
                </Timeline>
            </div >
        );
    }
}

export default TimelinePage
