import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import './orderDetail.less'

class OrderDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderDetail: null
    }
  }

  componentDidMount() {
    const orderid = this.props.params.id;
    orderApi.orderdetail({
      orderid
    }).then(result => {
      if (result.result == 1) {
        const data = result.data[0]
        this.setState({
          orderDetail: data
        });
      }
    })
  }

  getStatusShowText = (status) => {
    const orderStatus = {
      '0': '已取消',
      '10': '待支付',
      '20': '待发货',
      '30': '待收货',
      '40': '确认收货',
      '50': '已提交',
      '60': '待发货',
    }
    return orderStatus[status]
  }

  render() {
    const { orderDetail } = this.state
    if (!orderDetail) {
      return null;
    }
    return (
      <div className="wx-orderDetail">
        <WingBlank>
          <div style={{backgroundColor:'white'}}>
            <p>
              订单状态: {this.getStatusShowText(orderDetail.orderState)}
            </p>
            <p>
              订单总额: {`￥${orderDetail.orderTotalPrice}`}
            </p>
            <p>
              商品总价: {`￥${orderDetail.goodsAmount}`}
            </p>
            <p>
              余额支付金额: {`￥${orderDetail.predepositAmount}`}
            </p>
            <p>
              运费价格: {`￥${orderDetail.shippingFee}`}
            </p>
            <p>
              支付方式: {`￥${orderDetail.paymentName}`}
            </p>
          </div>
          <div style={{backgroundColor:'white'}}>
            <p>
              收货人: {orderDetail.address.trueName}
            </p>
            <p>
              收货地址: {orderDetail.address.areaInfo} {orderDetail.address.address}
            </p>
          </div>
          <div style={{backgroundColor:'white'}}>
            <p>
              订单编号: {orderDetail.orderSn}
            </p>
              {
                  orderDetail.orderGoodsList.map(goods => {
                      return <Flex key={goods.specId} onClick={() => {
                          common.gotoGoodsDetail({
                              specId:goods.specId
                          })
                      }}>
                        <Img src={goods.goodsImage}
                             style={{ width: '1.5rem', height: '1.5rem' }} />
                        <div>
                          <p>{goods.goodsName}</p>
                          <p>数量: x{goods.goodsNum}</p>
                        </div>
                        <div>
                            {`￥${goods.goodsPrice}`}
                        </div>
                      </Flex>
                  })
              }
          </div>
        </WingBlank>
      </div>
    )
  }
}

export default withRouter(OrderDetail);
