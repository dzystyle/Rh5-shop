import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Toast } from 'antd-mobile';
import * as storeApi from '../api/store';

import './CouponList.less';

const goodsTypes = {
  '0': '全部商品',
  '1': '指定商品分类',
  '2': '指定商品类型',
  '3': '指定品牌',
  '4': '指定商品'
}

class CouponList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * 点击领券
   */
  onSel = (sel) => {
    // console.log(sel);
    storeApi.receiveCoupon({
      couponId: sel.id,
      storeId: sel.shopActivity.storeId
    }).then(result => {
      Toast.info(result.msg);
    })
  };

  render() {
    if (!this.props.storeId) {
      return null;
    }
    const { couponList } = this.props;
		const IconClass = ({ url }) => {
		  return <div style={{
		    width: '8.27rem',
		    height: '0.50rem',
		    background: `url(${url}) center center /  0.64rem 0.64rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return <div className='wx-CouponList'>
    	
      <List renderHeader={() => '店铺优惠券'}>      
      {
          couponList && couponList.map(item => {
            const { shopActivity } = item;  
            const showMemberLimit = shopActivity.shopActivityMembership.memberGradle ?
              shopActivity.shopActivityMembership.memberGradle.gradleName : '全部会员'

            return <List.Item key={item.id} onClick={() => { this.onSel(item); }} style={{paddingLeft:0}} >
            	<IconClass url={'./assets/img/blue_line.png'}></IconClass>
            <Flex style={{background:'#fff',padding:'0px'}}>
              <Flex.Item style={{marginLeft:'0.3rem'}}>{item.shopActivity.storeName} ({item.couponSource}元)</Flex.Item>
              <Flex.Item>
                <div>会员限制：{showMemberLimit}</div>
                <div>商品限制：{goodsTypes[shopActivity.goodsType]}</div>
                <div style={{color:'red'}}>{item.description}</div>
                <div>{item.shopActivity.startTimeStr} 至 <br/> {item.shopActivity.endTimeStr}</div>
              </Flex.Item>  
            </Flex>
          </List.Item>
        })  
      }  
      </List>
    </div>
  }
}

export default CouponList;
