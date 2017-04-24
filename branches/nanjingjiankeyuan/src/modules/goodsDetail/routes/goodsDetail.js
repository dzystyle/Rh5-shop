import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Card,
  Grid,
  Popup,
  Modal
} from 'antd-mobile';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import CouponList from 'commonComponent/CouponList';
import GoodsMoreInfo from '../components/GoodsMoreInfo';
import GoodsList from '../components/GoodsList';
import StoreInfo from '../components/StoreInfo';
import GoodsSpec from '../components/GoodsSpec';
import EvaluateGoodsList from '../components/EvaluateGoodsList';
import { Map } from 'immutable'
import * as goodsDetailApi from '../api/goodsDetail';
import * as cartApi from '../api/cart';
import * as storeApi from '../api/store';

import './goodsDetail.less';

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsDetailInfo: Map(),
      buyCount: 1,
      cartNum: 0,
      isFav: 0,
      modal1: false,
      imgurl:''
    }
    // 获取URL参数
    // if (this.props.location.query) {
    //   if (this.props.location.query.specId) {
    // this.specId = this.props.location.query.specId;
    //   }
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.specId != this.props.params.specId) {
      console.log('componentDidUpdate', prevProps.params.specId,
        this.props.params.specId);

      this.refresh();
    }
  }

  refresh = () => {
    Toast.loading();
    // this.setState({
    //   cartNum: common.getCartNum()
    // });

    cartApi.cartList().then(result => {
      if (result.result == 1 && result.data) {
        let cartNum = 0;
        result.data.forEach(function(element) {
          cartNum += element.goodsNum
        });
        this.setState({
          cartNum
        });
      }
    })

    // 获取商品详情
    goodsDetailApi.goodsdetail({
      specId: this.props.params.specId
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      const goodsDetailInfo = Map(result.data[0]);
      // alert(JSON.stringify(goodsDetailInfo));
      this.setState({
        goodsDetailInfo,
        isFav: goodsDetailInfo.isFav
      });

      const node = this.refs.detailScroll;
      node.scrollTop = 0;

      // 登录后才上报 浏览记录
      if (common.isLogin()) {
        setTimeout(function() {
          goodsDetailApi.goodsBrowseSaveOrUpdate({
            goodsId: goodsDetailInfo.get('goodsId')
          });
        }, 100);
      }
    });
  }

  componentDidMount() {
    this.refresh();
  }

  gotoEvaluateList = (goodsDetailInfo) => {
    this.props.router.push(`/evaluteList/${goodsDetailInfo.goodsId}`);
  }

  gotoConsultation = (goodsDetailInfo) => {
    this.props.router.push(`/consultList/${goodsDetailInfo.goodsId}`);
  }

  /**
   * 点击获取优惠券
   */
  getCoupon = () => {
    const goodsDetailInfo = this.state.goodsDetailInfo.toJS();

    storeApi.couponlist({
      storeId: goodsDetailInfo.storeId
    }).then(result => {
      const data = result.data;
      if (data && data.length > 0) {
        Popup.show(<CouponList
          storeId={goodsDetailInfo.storeId}
          couponList={data}
          onClose={() => Popup.hide()} />, { animationType: 'slide-up' });
      } else {
        Toast.info('暂无优惠券可领券', 1)
      }
    })

    /*const onMaskClose = () => {
      console.log('关闭遮罩');
    }
    Popup.show(<CouponList
      storeId={goodsDetailInfo.storeId}
      onClose={() => Popup.hide()} />, { animationType: 'slide-up', onMaskClose });*/
  }

  /**
   * 点击获取规格
   */
  getSpec = (e) => {
    // document.style = 
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
    Popup.show(
      <GoodsSpec
        addCart={this.addCart}  
        gotoBuy={this.gotoBuy}
        buyCount={this.state.buyCount}  
        onChangeSpec={this.onChangeSpec}
        onChangeBuyNum={this.onChangeBuyNum}
        goodsDetailInfo={goodsDetailInfo}
        onClose={() => Popup.hide()} />, { animationType: 'slide-up' }
    );
  }

  onChangeBuyNum = (num) => {
    this.setState({
      buyCount: num
    });
  }

  // 收藏
  storecollection = () => {
    common.checkLogin();
    const goodsSpec = this.state.goodsDetailInfo.get('goodsSpec')
    goodsDetailApi.storecollection({
      favType: 1,
      goodsId: goodsSpec.goodsId
    }).then(result => {
      if (result.result == 1) {
        if (result.isfav == 1) {
          Toast.info('已收藏');
        }
        this.setState({
          isFav: result.isfav
        });
      } else {
        Toast.fail(result.msg);
      }
    });
  }

  // 去购物车
  gotoCart = () => {
    common.gotoCart();
  }

  // 加入购物车处理
  addCart = (count) => {
    common.checkLogin();
    const goodsSpec = this.state.goodsDetailInfo.get('goodsSpec')
    cartApi.addCart({
      goodsId: goodsSpec.goodsId,
      count: count || 1,
      specId: goodsSpec.goodsSpecId,
      saveType: 0
    }).then(result => {
      if (result.result == 1) {
        const cartCount = result.data[0].cartCount;
        this.setState({
          cartNum: cartCount
        })
        // 同步购物车数量
        common.setCartNum(cartCount);
        Toast.info('商品已添加到购物车');
      } else {
        Toast.fail(result.msg);
      }
    });
  }

  // 立即购买
  gotoBuy = (count) => {
    common.checkLogin();
    const goodsSpec = this.state.goodsDetailInfo.get('goodsSpec')
    // 先加购物车
    cartApi.addCart({
      goodsId: goodsSpec.goodsId,
      count: count || 1,
      specId: goodsSpec.goodsSpecId,
      saveType: 1
    }).then(result => {
      if (result.result == 1) {
        const cartCount = result.data[0].cartCount;
        this.setState({
          cartNum: cartCount
        })
        // 同步购物车数量
        common.setCartNum(cartCount);
        // 跳转到订单确认页面
        common.gotoOrder({
          cartId: result.data[0].cartIds
        });
      } else {
        Toast.fail(result.msg);
      }
    })

  }

  // 修改规格处理
  onChangeSpec = (currentSpecs, data) => {
    // 同步数据    
    const newGoodsDetailInfo = this.state.goodsDetailInfo.update('goodsSpec', (item) => {
      item.specGoodsStorage = data.num;
      item.specGoodsPrice = data.price;
      item.specGoodsSpec = currentSpecs;
      item.goodsSpecId = data.specId;
      return item;
    })
    this.setState({
      goodsDetailInfo: newGoodsDetailInfo,
    })
  }
	showModal = (key,item) => (e) => {
    e.preventDefault();
    this.setState({
      [key]: true,
      imgurl:item
    });
  }
	onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
	Close=()=>{
		this.setState({
      modal1: false,
    });
	}
  render() {
    const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
    if (!goodsDetailInfo || !goodsDetailInfo.goodsCallyList) {
      return null;
    }
    console.log('render', goodsDetailInfo);

    // 获取规格组合名
    // 判断是否有规格参数
    const vals_xg=goodsDetailInfo.goodsSpec.specGoodsSpec || ''

    //规格参数用变量 vals_xg  代替
    const vals = Object.keys(vals_xg).map(function(key) {
      return vals_xg[key];
    });

    const selectedSpecGoodsSpec = vals.join(' ');
    return (
      <div className='wx-goods-detail'>
        <div ref='detailScroll' className='fix-scroll hastitle hasbottom' style={{
            backgroundColor: 'white'}}>
        <Carousel autoplay={false} infinite={false} dots={true} selectedIndex={1}>
          {
            goodsDetailInfo.goodsCallyList.map((item,index) => (
                <Img key={index} src={item} onClick={this.showModal('modal1',item)} />
            ))
          }          
        </Carousel>
         <Modal title="商品详情"
	          visible={this.state.modal1}
	          transparent
	          maskClosable={true}
	          onClose={this.onClose('modal1')}
	          style={{width:'8rem',height:'10rem'}}
	        >
						<Img className='imgDe' onClick={()=>this.Close()} src={this.state.imgurl} style={{width:'8rem',height:'8rem'}}/>
	        </Modal>
	      
        <Flex className='wx-goods-detail-info' direction='column' align='start' >
            <WingBlank>
              <Flex.Item>{goodsDetailInfo.goodsName}</Flex.Item>
            </WingBlank>
            <WingBlank>
              <p style={{color:'red',fontSize:'.24rem'}}>
                {goodsDetailInfo.goodsSubtitle}
              </p>  
              <p style={{color:'red',fontSize:'.24rem'}}>{`¥${goodsDetailInfo.goodsSpec.specGoodsPrice}`}</p>
            </WingBlank>  
        </Flex>
				{goodsDetailInfo.goodsShow==0?<div style={{height:'1rem',background:'#ddd',lineHeight:'1rem',textAlign:'center',fontSize:'0.5rem'}}>商品已经下架啦~</div>:<div>  
        <List>  
          <List.Item arrow="horizontal" onClick={this.getCoupon}>
            领券猛戳这里
          </List.Item>
          <List.Item arrow="horizontal" onClick={this.getSpec}>
            已选：{selectedSpecGoodsSpec}
          </List.Item>
          <List.Item>
            地区：{goodsDetailInfo.cityName}
          </List.Item>
          <List.Item>
            运费：{goodsDetailInfo.goodsTransfeeCharge==1?'卖家承担运费':goodsDetailInfo.goodsTransfeeCharge==2?'免运费':'买卖家承担运费'}
          </List.Item>
        </List>
        <EvaluateGoodsList
          gotoEvaluateList={this.gotoEvaluateList}
          gotoConsultation={this.gotoConsultation}
          goodsDetailInfo={goodsDetailInfo}></EvaluateGoodsList>
        <WhiteSpace></WhiteSpace>
        <StoreInfo goodsDetailInfo={goodsDetailInfo}></StoreInfo>
        <WhiteSpace></WhiteSpace>
        <GoodsList goodsDetailInfo={goodsDetailInfo}></GoodsList>
        <GoodsMoreInfo goodsDetailInfo={goodsDetailInfo}></GoodsMoreInfo>
        </div>}
        </div>
        <CartBar storecollection={this.storecollection}
          isFav={this.state.isFav}  
          data={goodsDetailInfo.goodsShow}
          cartNum={this.state.cartNum}
          showCollectionCart={true}
          gotoCart={this.gotoCart}
          gotoBuy={this.gotoBuy}
          addCart={this.addCart}
        ></CartBar>
        
      </div>
    )
  }
}

export default withRouter(GoodsDetail);
