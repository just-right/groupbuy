import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { InputNumber } from 'antd';

class InputNumberPage extends Component {

  onChange(value) {
    console.log('changed', value);
  }
  render() {
    return (
      <div>
        <InputNumber min={1} max={10} defaultValue={1} onChange={this.onChange.bind(this)} />
      </div>
    );
  }

}
export default InputNumberPage;