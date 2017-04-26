import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button, Badge,WingBlank } from 'antd-mobile';

import "./OrderBar.less"

class OrderBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // 立即购买
  _onSubmitOrder = () => {
    this.props.onSubmitOrder();
  }

  render() {
    const { totalPrice } = this.props;
    return (
      <div className='wx-orderbar'>
        <Flex style={{ width:'100%'}}>
          <Flex.Item style={{ flex: 2,textAlign:'center',color:'red' }}>
            实付款: {`¥${totalPrice}`}
          </Flex.Item>
          <Flex.Item  onClick={()=>this._onSubmitOrder()} style={{flex:1}}>
            <WingBlank ><Button type='primary'>确认订单</Button></WingBlank>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default OrderBar;
