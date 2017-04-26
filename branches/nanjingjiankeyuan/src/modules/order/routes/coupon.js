import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import Shop from '../components/Shop';
import Fee from '../components/Fee';
import OrderBar from '../components/OrderBar';

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponInfo: {}
    }

  }

  componentDidMount() {
    orderApi.addCouponMember({
      cartIds: this.props.params.cartIds
    }).then(result => {
      let data = result.data[0];

      //如果已经选择了券，需要初始化      
      if (this.props.order.couponId) {
        // 遍历对象，修改选中的券 checked      
        const storeIds = Object.keys(data);
        // 遍历store
        data = storeIds.map(item => {
          // 遍历券
          return data[item].map(coupon => {
            coupon.checked = this.props.order.couponId == coupon.id;
            return coupon;
          })
        })
      }
      this.setState({
        couponInfo: data
      });
    });
  }

  onChange = (storeId, coupon, checked) => {
    const { couponInfo } = this.state;
    const storeCouponList = couponInfo[storeId].map(item => {
      item.checked = item.id == coupon;
      return item;
    })
    couponInfo[storeId] = storeCouponList;
    this.setState({
      couponInfo
    });
  }

  submit = () => {
    // 先获取券信息
    const { couponInfo } = this.state;
    const storeIds = Object.keys(couponInfo);
    let couponIds = []
    storeIds.forEach(storeId => {
      couponInfo[storeId].forEach(coupon => {
        if (coupon.checked) {
          couponIds.push(coupon.id)
        }
      })
    })
    if (couponIds.length == 0) {
      Toast.info('请先选择券');
      return;
    }

    const couponId = couponIds.join(',');
    const { isPd, freight, paytype, selectedAddress } = this.props.order;
    orderApi.getPrice({
      cartIds: this.props.params.cartIds,
      cityId: selectedAddress.cityId,
      isPd,
      freight,
      couponId
    }).then(r => {
      const priceData = r.data[0];
      this.props.dispatch({
        type: 'selectCoupon',
        payload: {
          priceData,
          couponId
        }
      })
      this.props.router.go('-1');
    })
  }

  render() {
    const { couponInfo } = this.state;
    const storeIds = Object.keys(couponInfo);
    return <div>
      {
        storeIds && storeIds.length > 0 &&        
          storeIds.map(id => {
            const couponList = couponInfo[id]
            return <List key={id} renderHeader={couponList[0].shopActivityPromotionRule.shopActivity.storeName}>
              {
                couponList.map(coupon => {
                  return <Item key={coupon.id}>
                    <AgreeItem onChange={(e)=>this.onChange(id,coupon.id,e.target.checked)} checked={coupon.checked}>
                      {coupon.shopActivityPromotionRule.description}
                    </AgreeItem>
                    <Brief style={{ textAlign: 'right' }}>
                      {coupon.shopActivityPromotionRule.shopActivity.startTimeStr.substr(0, 10)} 至 {coupon.shopActivityPromotionRule.shopActivity.endTimeStr.substr(0, 10)}
                    </Brief>
                  </Item>
                })  
              }
            </List> 
          })
      }
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Button onClick={this.submit} type='primary'>确定</Button>
      </WingBlank>
    </div>
  }
}

export default withRouter(connect(function({ order }) {
  return { order }
})(Coupon));
