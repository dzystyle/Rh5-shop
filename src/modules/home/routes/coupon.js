import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  SegmentedControl
} from 'antd-mobile';
import * as couponApi from '../api/coupon';

import './coupon.less';

const Item = List.Item;

const goodsTypes = {
  '0': '全部商品',
  '1': '指定商品分类',
  '2': '指定商品类型',
  '3': '指定品牌',
  '4': '指定商品'
}

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponList: []
    }
  }

  refreshList = () => {
    couponApi.couponMemberList({
      couponIsUser: this.props.params.couponIsUser || 0
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          couponList: data || []
        })
      } else {
        Toast.info(result.msg);
      }
    })
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.couponIsUser !== this.props.params.couponIsUser) {
      this.refreshList();
    }
  }

  onChange = (index) => {
    this.props.router.replace('/coupon/' + index);
  }

  render() {
    const { couponList } = this.state;
    let couponIsUser = this.props.params.couponIsUser
    couponIsUser = (couponIsUser && parseInt(couponIsUser)) || 0
    console.log(couponIsUser);
    return (
      <div className='wx-coupon'>
        <SegmentedControl
          selectedIndex={couponIsUser}  
          onChange={(e)=>this.onChange(e.nativeEvent.selectedSegmentIndex)}
          style={{ height: '0.8rem' }}  
          values={['未使用', '已使用', '已过期']} tintColor={'red'}>
          
        </SegmentedControl>
        <List>
          {
            couponList.map((item, index) => {
              const { shopActivityPromotionRule } = item 
              const { shopActivity } = shopActivityPromotionRule
              const showMemberLimit = shopActivity.shopActivityMembership.memberGradle ? 
                shopActivity.shopActivityMembership.memberGradle.gradleName : '全部会员'
              return <Item key={index}>
                <Flex>
                  <Flex.Item>
                    <p style={{color:'#E43F47'}}>{shopActivity.storeName}</p>
                    <div style={{color:'red'}}>{`¥${shopActivityPromotionRule.couponSource}`}</div>
                  </Flex.Item>
                  <div>
                    <div>会员限制:{showMemberLimit}</div>
                    <div>商品限制:{goodsTypes[shopActivity.goodsType]}</div>
                    <div style={{color:'red'}}>{shopActivityPromotionRule.description}</div>
                    <div>{shopActivity.startTimeStr.substr(0,10)}至{shopActivity.endTimeStr.substr(0,10)}</div>
                  </div>
                </Flex>
              </Item> 
            })
          }
        </List>
      </div>
    )
  }
}

export default withRouter(Coupon);
