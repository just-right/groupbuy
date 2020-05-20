import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class RatePage extends React.Component {
  state = {
    value: 5,
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <span>
        <Rate tooltips={desc} onChange={this.handleChange} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>
    );
  }
}

export default RatePage