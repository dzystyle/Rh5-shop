import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';

const Item = List.Item;

class SubDeliveryOrderSuccess extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { addressList } = this.state;
    return <div className='wx-addresslist'>
          <List>
        <Item>
          订单编号:  
            </Item>
            <Item>
            </Item>
          </List>
      </div>
  }
}

export default withRouter(SubDeliveryOrderSuccess);
