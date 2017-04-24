import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
  Grid
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as storeApi from '../../api/store';

import './store.less';

const Item = List.Item;

class StoreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      store: null
    }
  }

  componentDidMount() {
    storeApi.storedetail({
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          goodsList: data.goodsList,
          store: data.store[0]
        })
      }
    });
  }

  storecollection = () => {
    storeApi.storecollection({
      storeId: this.props.params.storeId,
      favType: 2,
      goodsId: null
    }).then(result => {
      if (result.result == 1) {
        Toast.info(result.msg);
        const store = {
          ...this.state.store,
          isFav: result.isfav
        };
        this.setState({
          store
        })
      }

    });
  }

  render() {
    const { store, goodsList } = this.state;
    if (!store) {
      return null;
    }
    const { params, router } = this.props;
    const storeCodeShow = <Img src={store.storeCode} />;
    const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat center center`;
    return <div className='wx-store'>
      <div className='fix-scroll hastitle'>
      <div className='wx-store-header' style={{ background: storeBannerShow }}>
        <WingBlank size='sm'>  
          <Flex className='wx-store-header-body'>
            <Img src={store.storeLogo} style={{
              width: '2rem',
              height: '1rem'
            }} />
            <Flex.Item>
              <div>{store.storeName}</div>
              <div>{store.storeCollect}人关注</div>
            </Flex.Item>
            <Flex.Item>
            </Flex.Item>
            <Button className='rightBtn' type='primary' size='small' onClick={this.storecollection}>
              {
                store.isFav==1?'已关注':'关注'
              }
            </Button>
          </Flex>
        </WingBlank>
      </div>
      <WhiteSpace></WhiteSpace>
      <Flex style={{textAlign: 'center'}}>
        <Flex.Item onClick={()=>
          router.push(`/store/${params.storeId}/goods`)
        }>
          <div>全部</div>
          <div>{store.storeGoodsCount}</div>
        </Flex.Item>
        <Flex.Item onClick={()=>
          router.push(`/store/${params.storeId}/newgoods`)
        }>
          <div>上新</div>
          <div>{store.newGoodsNum}</div>
        </Flex.Item>
        <Flex.Item onClick={()=>
          router.push(`/store/${params.storeId}/coupon`)
        }>
          <div>优惠券</div>
          <div>{store.couponNum}</div>
        </Flex.Item>
        <Flex.Item>
          <div>店铺动态</div>
          <div>0</div>
        </Flex.Item>
      </Flex>
      <WhiteSpace></WhiteSpace>
      <List>
        <Item extra={store.storeTel} style={{marginRight:'0.2rem'}}>
          商家电话
        </Item>
        <Item extra={storeCodeShow} style={{marginRight:'0.2rem'}}>
          店铺二维码
        </Item>
        <Item>
          店铺介绍 <span style={{color:'gray'}}> {store.storeName}</span>
        </Item>
        <Item>
          开始时间 <span style={{color:'gray'}}> {store.createTimeStr}</span> 
        </Item>
        <Item>
          授权品牌
        </Item>
        </List>
      </div>  
    </div>
  }
}

export default withRouter(StoreDetail);
