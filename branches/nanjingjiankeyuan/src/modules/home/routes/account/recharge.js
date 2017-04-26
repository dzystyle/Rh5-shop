import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  InputItem,
  Button
} from 'antd-mobile';
import { createForm } from 'rc-form';
import * as memberApi from '../../api/member';
import { common } from 'common';
import './recharge.less';

const Item = List.Item;

class Recharge extends Component {

  state = {
    memberDetail: {
      availablePredeposit: '0.0'
    }
  }

  componentDidMount() {
    const { getFieldProps } = this.props.form;
    memberApi.memberDetail().then(result => {
      if (result.result == 1 && result.data && result.data.length > 0) {
        this.setState({
          memberDetail: result.data[0]
        });
      }
    })
  }

  next = () => {
    const getFieldsValue = this.props.form.getFieldsValue();
    if (!getFieldsValue.amount || getFieldsValue.amount == '') {
      Toast.info('请输入金额');
      return;
    }

    memberApi.recharge({
      amount: getFieldsValue.amount
    }).then(result => {
      console.log(result);
      if (result.result == 1 && result.data && result.data.length > 0) {
        common.gotoPay({
          paySn: result.data[0].pdrSn,
          orderTotalPrice: result.data[0].pdrAmount
        })
      } else {
        Toast.info(result.msg)
      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { memberDetail } = this.state;
    return (
      <div className="wx-recharge">
        <List>
          <InputItem
            {...getFieldProps('balance') }
            editable={false}
            value={`￥${memberDetail.availablePredeposit}`}
          >账户余额：</InputItem>
          <InputItem
            {...getFieldProps('amount')}  
            placeholder="请输入金额"
            autoFocus
            type='number'
          >充值金额:</InputItem>
          <Item>
            <Button onClick={this.next} type='primary'>下一步</Button>
          </Item>
        </List>
      </div>
    )
  }
}

export default withRouter(createForm()(Recharge));
