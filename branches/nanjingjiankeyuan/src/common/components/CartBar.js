import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button, Badge } from 'antd-mobile';

import "./CartBar.less"

class CartBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // 收藏
  _storecollection = () => {
    this.props.storecollection();
  }
  // 去购物车
  _gotoCart = () => {
    this.props.gotoCart();
  }
  // 加入购物车处理
  _addCart = () => {
    this.props.addCart();
  }
  // 立即购买
  _gotoBuy = () => {
    this.props.gotoBuy();
  }

  render() {
    const { showCollectionCart } = this.props;
    const filename = this.props.isFav == 1 ? 'b_1_h_2.png' : 'b_1_h_1.png'
    const isFavUrl = `${common.SERVER_DOMAIN}/res_v4.0/h5/images/${filename}`
    return (
      <div className='wx-cartbar'>
        <Flex style={{
          width: '100%',
          paddingLeft: '0.1rem',
          paddingRight:'0.1rem'
        }}>
          {
            showCollectionCart && <Flex.Item style={{ flex: 1, textAlign: 'center' }} onClick={() => this._storecollection()}>
              <img src={isFavUrl} style={{width:'.44rem',height:'.44rem'}} alt=""/>   
              <div>收藏</div>
            </Flex.Item>
          }
          {
            showCollectionCart && <Flex.Item style={{ flex: 1, textAlign: 'center' }} onClick={() => this._gotoCart()}>
              <div>
                <Badge text={this.props.cartNum} style={{
                  position: 'absolute',
                  top: '-50px',
                  left: '.22rem'
                }}></Badge>
                <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`} style={{ width: '44px', height: '44px' }} alt="" />
                <div>购物车</div>
              </div>
            </Flex.Item>
          }
          <Flex.Item className='addCart' onClick={()=>this._addCart()} style={{flex:2}}>
            <Button disabled={this.props.data==0?true:false} type='primary'>添加购物车</Button>
          </Flex.Item>
          <Flex.Item className='goBuy' onClick={()=>this._gotoBuy()} style={{flex:2}}>
            <Button disabled={this.props.data==0?true:false} type='primary'>立即购买</Button>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default CartBar;
