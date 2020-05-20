import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Calendar } from 'antd';

class CalendarPage extends Component {
    onPanelChange(value, mode) {
        console.log(value, mode);
    }

    render() {
        return (
            <div>
                <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} onPanelChange={this.onPanelChange.bind(this)} />
                </div>,
             </div>

        );
    }
}
export default CalendarPage;
