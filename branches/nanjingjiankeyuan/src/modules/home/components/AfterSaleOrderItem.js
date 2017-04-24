import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal
} from 'antd-mobile';

class AfterSaleOrderItem extends Component {

  cancelOrder = (orderItem) => {
//  this.props.router.push({
//    pathname: '/applyAfterSale',
//    state: {
//      orderItem,
//      type: 1 // type 1代表取消订单
//    }
//  })
    Modal.alert('提示', '是否取消订单', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.cancleorder({
            ordersn: orderItem.orderSn
          }).then(result => {
            if (result.result == 1) {
              // 取消成功
              if (this.props.cancelOrder) {
                this.props.cancelOrder();
              }
            }
          })
        }
      },
    ]);
  }

  gotoApply = (dataItem, goods) => {
    this.props.router.push({
      pathname: '/applyAfterSale',
      state: {
        orderItem: dataItem,
        goodsItem: goods,
        type: 2 // type 2代表申请售后
      }
    })
  }

  gotoOrderDetail = (goods) => {
    this.props.router.push('/orderDetail/' + goods.orderId)
  }

  render() {
    const { dataItem } = this.props;
    let orderStatus = '';
    let showCancelBtn = false;
    let showApplyBtn = false;

    switch (dataItem.orderState) {
      case 20:
        orderStatus = '等待发货'
        showCancelBtn = true;
        break;
//    case 30:
//      orderStatus = '已发货'
//      showApplyBtn = true;
//      break;
      case 40:
        orderStatus = '已完成'
        showApplyBtn = true;
        break;
    }
    return <div className='orderitem'>
      {dataItem.orderState==30?'':<WhiteSpace></WhiteSpace>}
      <WingBlank>
        <Flex justify='between'>
          <div>{dataItem.orderState==30?'':dataItem.storeName}</div>
          <div className="paystaus">{dataItem.orderState==30?'':orderStatus}</div>
        </Flex>
        {
          dataItem.orderState==30?'':dataItem.orderGoodsList.map(goods => {
            return <div key={goods.specId} >
              <Flex onClick={() => this.gotoOrderDetail(goods)}>
                <div style={{ width: '1.5rem', height: '1.5rem' }}>
                  <Img src={goods.goodsImage} style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <div>
                  <div style={{
                    marginTop:'0.1rem',
                    height: '0.8rem',
                    lineHeight: '0.4rem',
                    overflow:'hidden',
                      marginLeft:'0.2rem'
                  }}>{goods.goodsName}</div>
                  <p style={{fontSize:'.24rem',color:'gray',marginLeft:'0.2rem'}} dangerouslySetInnerHTML={{ __html: goods.specInfo }}></p>
                </div>
              </Flex>
              <Flex justify='end'>
              {
                showApplyBtn && <Button
                  onClick={(e) => this.gotoApply(dataItem,goods)}
                  type='ghost' size='small' inline>申请售后</Button>
                }
              </Flex>  
            </div>  
          })
        }
        {dataItem.orderState==30?'':<WhiteSpace></WhiteSpace>}
        <Flex justify='between'>
          {dataItem.orderState==30?'':<div>实付款: {`￥${dataItem.goodsAmount}`}</div>}
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(dataItem)}
                type='ghost' size='small' inline>取消订单</Button>
            }
          </div>
        </Flex>
        {dataItem.orderState==30?'':<WhiteSpace></WhiteSpace>}
      </WingBlank>
      {dataItem.orderState==30?'':<WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>}
    </div>
  }
}

export default withRouter(AfterSaleOrderItem);
