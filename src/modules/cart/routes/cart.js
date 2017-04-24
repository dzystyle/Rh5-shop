import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  Checkbox,
  Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import CartShop from '../components/CartShop';
import * as goodsApi from 'common/api/goods';
import * as cartApi from '../api/cart';
import * as storeApi from '../api/store';
import { common } from 'common';
import CouponList from 'commonComponent/CouponList';
import CartTopAction from '../components/CartTopAction';

const AgreeItem = Checkbox.AgreeItem;

import './cart.less';


class Cart extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    initAction: React.PropTypes.func,
    clearAction: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      relGoodsRecommedlist: [],
      cartList: [],
      isInit: false,
      checkAll: false,
      goodsNum: 0,
      goodsTotalPrice: 0,
      editStatus: 0
    }
  }

  onChangeEditStatus = (status) => {
    this.setState({
      editStatus: status
    })
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  initAction = () => {
    // 绑定头部事件
    this.context.initAction({
      title: <CartTopAction status={this.state.editStatus} onChange={this.onChangeEditStatus}></CartTopAction>
    })
  }

  componentDidMount() {
    this.initAction();

    Toast.loading();
    cartApi.cartList().then(result => {
      Toast.hide();
      if (result.result == 1) {
        this.setState({
          isInit: true,
          cartList: result.data || []
        })
      }
    })

    goodsApi.relGoodsRecommedlist().then(result => {
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      let data = result.data;
      this.setState({
        relGoodsRecommedlist: data
      });
    });
  }

  refreshCartList = () => {
    cartApi.cartList().then(result => {
      if (result.result == 1) {
        const cartList = result.data || [];
        this.setState({
          cartList,
          editStatus: 0
        })
        this.initAction();
        this.refreshTotalPriceAndCount(cartList);
      }
    })
  }

  gotoLogin = () => {
    common.gotoLoginAndBack();
  }

  gotoBuy = () => {
    let cartId = [];
    this.state.cartList.forEach(shop => {
      shop.list.forEach(goods => {
        if (goods.checked) {
          cartId.push(goods.cartId);
        }
      })
    })
    if (cartId.length == 0) {
      Toast.info('请先选择商品', 1)
      return;
    }
    common.gotoOrder({
      cartId: cartId.join(',')
    });
  }

  updateCart = (store, checkedGoods, num) => {
    cartApi.updateCartCount({
      cartId: checkedGoods.cartId,
      count: num
    }).then(result => {
      if (result.result == 1) {
        // 修改商品数量
        checkedGoods.goodsNum = num;
        // 选中商品
        this.checkGoods(store, checkedGoods, true);
      }
    });
  }

  delCart = (goods) => {
    cartApi.deleteCart({ cartId: goods.cartId }).then(result => {
      if (result.result == 1) {
        this.refreshCartList();
      }
    })
  }

  delShopCart = (shop) => {
    cartApi.deleteCart({ cartId: shop.cartIds }).then(result => {
      if (result.result == 1) {
        this.refreshCartList();
      }
    })
  }

  delBySelected = () => {
    let cartId = [];
    this.state.cartList.forEach(shop => {
      shop.list.forEach(goods => {
        if (goods.checked) {
          cartId.push(goods.cartId);
        }
      })
    })
    if (cartId.length == 0) {
      Toast.info('请先选择商品', 1)
      return;
    }
    cartApi.deleteCart({ cartId: cartId.join(',') }).then(result => {
      if (result.result == 1) {
        // this.setState({
        //   editStatus: 0
        // });
        Toast.info('删除成功', 1, () => {
          this.refreshCartList();
        })
      }
    })
  }

  // 选择购物车
  checkGoods = (checkedStore, checkedGoods, checked) => {
    // 遍历当前店铺的所有商品
    const mapedList = checkedStore.list.map(goods => {
      if (checkedGoods.specId == goods.specId) {
        goods.checked = checked;
      }
      return goods
    })

    let isAllGoodsChecked = true;
    // 当前店铺商品 checked 不存在false,
    if (mapedList.find(item => !item.checked)) {
      isAllGoodsChecked = false;
    }

    const cartList = this.state.cartList.map(shop => {
      if (checkedStore.storeId == shop.storeId) {
        shop.list = mapedList;
        shop.checked = isAllGoodsChecked;
      }
      return shop;
    })

    let isCheckAll = true;
    if (cartList.find(shop => !shop.checked)) {
      isCheckAll = false;
    }
    this.setState({
      checkAll: isCheckAll,
      cartList
    });
    this.refreshTotalPriceAndCount(cartList);
  }

  // 选中店
  checkShop = (store, checked) => {
    const cartList = this.state.cartList.map(shop => {
      if (store.storeId == shop.storeId) {
        shop.checked = checked;
        const mapedList = shop.list.map(goods => {
          goods.checked = checked;
          return goods;
        })
        shop.list = mapedList;
      }
      return shop;
    })
    let isCheckAll = false;
    const checkedShopCount = cartList.filter(item => item.checked).length;
    if (checkedShopCount == cartList.length) {
      isCheckAll = true;
    }
    this.setState({
      checkAll: isCheckAll,
      cartList
    });
    this.refreshTotalPriceAndCount(cartList);
  }

  checkAll = (checked) => {
    const cartList = this.state.cartList.map(shop => {
      shop.checked = checked;
      const mapedList = shop.list.map(goods => {
        goods.checked = checked;
        return goods;
      })
      shop.list = mapedList;
      return shop;
    })
    this.setState({
      checkAll: checked,
      cartList: cartList
    });
    this.refreshTotalPriceAndCount(cartList);
  }

  // 刷新数量和金额
  refreshTotalPriceAndCount = (cartList) => {
    let totalPrice = 0;
    let goodsNum = 0;
    cartList.forEach(shop => {
      shop.list.forEach(goods => {
        if (goods.checked) {
          goodsNum += goods.goodsNum
          totalPrice = parseFloat(totalPrice) + parseFloat(goods.goodsPrice * goods.goodsNum)
        }
      })
    });
    totalPrice = totalPrice.toFixed(2)
    this.setState({
      goodsNum,
      goodsTotalPrice: totalPrice
    })
  }

  // 领券  
  getCoupon = (store) => {
    storeApi.couponlist({
      storeId: store.storeId
    }).then(result => {
      const data = result.data;
      if (data && data.length > 0) {
        const onMaskClose = () => {
          console.log('关闭遮罩');
        }
        Popup.show(<CouponList
          storeId={store.storeId}
          couponList={data}
          onClose={() => Popup.hide()} />, { animationType: 'slide-up', onMaskClose });
      } else {
        Toast.info('暂无优惠券可领券', 1)
      }
    })

  }

  render() {
    const isLogin = common.isLogin();
    const { cartList, isInit, editStatus } = this.state;
    if (!isInit) {
      return null;
    }
    return <div className='wx-cart-list'>
      <div className='fix-scroll hastitle' style={{paddingBottom:'1.8rem'}}>
        {
          !isLogin && <WingBlank>
            <Button inline size="small" onClick={this.gotoLogin} style={{marginTop:'20px'}}>登录</Button>
          </WingBlank>
        }
        {
          cartList && cartList.map((shop,index) => {
            return <CartShop
              key={index}  
              data={shop}
              delShopCart={this.delShopCart}
              delCart={this.delCart}
              updateCart={this.updateCart}
              checkShop={this.checkShop}
              checkGoods={this.checkGoods}
              getCoupon={this.getCoupon}
            >
            </CartShop>
          })
        }
        {
          cartList.length == 0 && 
            <div style={{ padding:'20px 20px' }}>
              <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`}></img>
              <span style={{fontSize: '28px',color:'gray'}}>购物车是空的</span>
            </div>
        }
      
        <div>
          <RecommendGoods data={this.state.relGoodsRecommedlist}></RecommendGoods>
        </div>
      </div>  
      
      <div className='wx-cart-list-bar'>
        <Flex>
          <Flex.Item>
            <AgreeItem checked={this.state.checkAll}
              onChange={(e)=>this.checkAll(e.target.checked)}
              >全选</AgreeItem>
          </Flex.Item>
          {
            editStatus == 0 ? [
              <Flex.Item key={1}>
                <span style={{minWidth:'100px'}}>合计: ¥{this.state.goodsTotalPrice}</span><br/>
                <span>共{this.state.goodsNum}件</span>
              </Flex.Item>,
              <Flex.Item key={2} style={{
                textAlign: 'right',
                margin: '0.1rem',
              }}>
                <Button type='primary' size='small' inline onClick={this.gotoBuy}>去结算</Button>
              </Flex.Item>    
             ] : [
              <Flex.Item key={1}>
                <Button size='small' inline onClick={this.delBySelected}>删除</Button>    
              </Flex.Item>,
              <Flex.Item key={2}>&nbsp;</Flex.Item>  
             ]
          }
          
        </Flex>
      </div>
    </div>
  }
}

export default withRouter(Cart);
