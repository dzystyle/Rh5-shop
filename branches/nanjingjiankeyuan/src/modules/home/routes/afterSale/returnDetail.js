import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex
} from 'antd-mobile';
import * as orderApi from '../../api/order';

class ReturnDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      returnDetail: null
    }
  }

  componentDidMount() {
    const refundId = this.props.params.refundId;
    orderApi.returnDetail({
      refundId
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          returnDetail: result.data[0]
        })
      }
    })
  }

  render() {
    const { returnDetail } = this.state
    if (!returnDetail) {
      return null;
    }
    const { refundState, goodsState, sellerState } = returnDetail;
    let refundStateShow = '';
    if (refundState == 3) {
      refundStateShow = '已完成'
    } else {
      if (sellerState == 2 && goodsState == 1) {
        refundStateShow = '商家同意退款'
      } else {
        refundStateShow = '进行中'
      }
    }
    return (
      <div className='fix-scroll' style={{paddingTop:'0.9rem'}}>
      <WingBlank >
        <WhiteSpace></WhiteSpace>
        <div>
          退款金额 <span style={{color:'red'}}>【{`￥${returnDetail.refundAmount}`}】</span>  
        </div>
        <Flex justify='between'>
          <p>
            付款支付实物: {returnDetail.refundAmount}
          </p>
          <p style={{ color: 'red' }}>{refundStateShow}</p>  
        </Flex>
        <p style={{color:'red'}}>
          提示：雷铭在线商城会将您的支付款退回到对应的支付账户内，注意查收。感谢您的理解和支持
        </p>
        <p>
          差额原因: {returnDetail.reasonInfo==''?'其他':returnDetail.reasonInfo}  
        </p>
        <p>
          退款申请时间: {returnDetail.createTimeStr} 
        </p>
        <p  style={{color:'red'}}>
          退款状态: {refundStateShow} 
        </p>
      </WingBlank >
      </div>
    )
  }
}

export default withRouter(ReturnDetail);
