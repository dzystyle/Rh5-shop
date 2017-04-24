import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { WhiteSpace, WingBlank, Toast, Flex, List } from 'antd-mobile';
import * as storeApi from '../../api/store';

const Item = List.Item;

class StoreCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponList: []
    }
  }

  componentWillMount() {
    storeApi.couponlist({
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        if (result.data) {
          this.setState({
            couponList: result.data
          })
        } else {
          Toast.info('暂没有优惠券');
        }
      } else {
        Toast.info(result.msg);
      }
    })
  }

  /**
   * 点击领券
   */
  onSel = (sel) => {
    storeApi.receiveCoupon({
      couponId: sel.id,
      storeId: sel.shopActivity.storeId
    }).then(result => {
      Toast.info(result.msg);
    })
  };

  render() {
    const {
      floorList,
      relGoodsRecommedlist,
      activityBeenList,
      advPosition,
      recommendGoodslist
    } = this.state;
    return (
      <div>
        <List>
          {
            this.state.couponList.map((item,index) => {
              return <Item key={index}  onClick={() => { this.onSel(item) }}>
                <Flex>
                  <Flex.Item>
                    {item.shopActivity.storeName}<br />
                    <span style={{color:'red'}}>{`¥${item.couponSource}`}</span>
                  </Flex.Item>
                  <Flex.Item>
                    <div>会员限制:铜牌会员</div>
                    <div>会员限制:指定商品</div>
                    <div style={{color:'red'}}>{item.description}</div>
                    <div>{item.shopActivity.startTimeStr.substr(0,10)} 至 <br/> {item.shopActivity.endTimeStr.substr(0,10)}</div>
                  </Flex.Item>
                </Flex>
                
              </Item> 
            })
          }
       </List>
      </div>
    )
  }
}

export default withRouter(StoreCoupon);
