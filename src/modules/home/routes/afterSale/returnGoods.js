import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  List,
  InputItem,
  Button,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import * as orderApi from '../../api/order';

const Item = List.Item;

class ReturnGoods extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = () => {
    const fieldsValue = this.props.form.getFieldsValue();
    if (!fieldsValue.expressName || fieldsValue.expressName == '') {
      Toast.info('快递公司名称不能为空');
      return;
    }
    if (!fieldsValue.invoiceNo || fieldsValue.invoiceNo == '') {
      Toast.info('快递单号不能为空');
      return;
    }
    let reg =/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
 		if (reg.test(fieldsValue.invoiceNo)){   
   			Toast.info('快递单号格式不正确');
        return;   
   	}
    orderApi.returnDelivery({
      invoiceNo: fieldsValue.invoiceNo,
      expressName: fieldsValue.expressName,
      refundId: this.props.params.refundId
    }).then(result => {
      // console.log(result);
      if (result.result == 1) {
        this.props.router.goBack();
      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <List>
        <InputItem
            {...getFieldProps('expressName')}
            clear
            placeholder="请输入快递公司名称"
            autoFocus
          >配送公司:</InputItem>
        <InputItem
            {...getFieldProps('invoiceNo')}
            clear
            placeholder="请输入快递单号"
        >物流单号:</InputItem>
        <Item>
          <Button onClick={this.onSubmit} type='primary'>确定</Button>
        </Item>
      </List>
    )
  }
}

export default withRouter(createForm()(ReturnGoods));
