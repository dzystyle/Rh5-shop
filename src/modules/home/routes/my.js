import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Icon,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Grid,
  Button,
  Badge
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as memberApi from '../api/member';
import RecommendGoods from 'commonComponent/RecommendGoods';
import * as goodsApi from 'common/api/goods';

import './my.less';

const Item = List.Item;

const OrderBadge = ({ num }) => {
  return <div style={{
      position: 'absolute',
      top: '0.2rem',
      right: '0.5rem'
    }}>
    <Badge text={num} />
  </div>
}

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetail: {

      },
      relGoodsRecommedlist: []
    }
  }

  componentDidMount() {
    const isLogin = common.isLogin();
    if (isLogin) {
      memberApi.memberDetail().then(result => {
        let data = result.data;
        if (data) {
          this.setState({
            memberDetail: data[0]
          });
        }
      })
    }
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

  gotoLogin = () => {
    common.gotoLogin();
  }

  renderItem = (item, index) => {
    const { memberDetail } = this.state;
    return <div style={{
        textAlign: 'center',
        height: '1.2rem',
        paddingTop: '0.3rem',
        position: 'relative'
      }}>
      <img src={item.icon} style={{height:'0.5rem'}}/>
      <div>{item.text}</div>
      {
        index == 0 && memberDetail.noPayOrder!=0 &&
          <OrderBadge num={memberDetail.noPayOrder}></OrderBadge>
      }
      {
        index == 1 && memberDetail.noReceiveOrder!=0 &&
          <OrderBadge num={memberDetail.noReceiveOrder}></OrderBadge>
      }
      {
        index == 2 && memberDetail.finishOrder!=0 &&
          <OrderBadge num={memberDetail.finishOrder}></OrderBadge>
      }
    </div>
  }

  onOrderMenuClick = (menu, index) => {
    // 售后跳售后列表
    if (index != 3) {
      this.props.router.push(`/orderList/${index + 1}`);
    } else {
      this.props.router.push('/afterSale');
    }
  }

  gotoOrderList = () => {
    this.props.router.push(`/orderList/0`);
  }

  render() {
    const url = 'http://bbc.leimingtech.com/'
    const orderMenu = [{
      icon: `${url}/res_v4.0/h5/images/carp.png`,
      text: `待付款`,
    }, {
      icon: `${url}/res_v4.0/h5/images/car.png`,
      text: `待收货`,
    }, {
      icon: `${url}/res_v4.0/h5/images/tlist.png`,
      text: `待评价`,
    }, {
      icon: `${url}/res_v4.0/h5/images/fool.png`,
      text: `售后`,
    }];
		
		const IconClass = ({ url }) => {
		  return <div style={{
		    width: '0.50rem',
		    height: '0.50rem',
		    background: `url(${url}) center center /  0.64rem 0.64rem no-repeat`,
		    display:'inline-block',
		    marginRight:'0.1rem'
		  }}
		  />
		}
    const isLogin = common.isLogin();
    const { memberDetail } = this.state;
    return <div className='wx-my fix-scroll'>
      <Flex style={{ height: '1.5rem',background:'url(./assets/img/mine_topbackimage.png) center / 100%'}}>
        <WingBlank>
          <Flex>
            <Img onClick={() => {
              if (common.isLogin()){
                this.props.router.push('/account')  
              }
              }}
              style={{ width: '1rem', height: '1rem',marginRight:'0.2rem' }} src={memberDetail.memberAvatar}></Img>
            {
              isLogin && memberDetail ? <div>
                账户: {memberDetail.memberName}
              </div> : <Button inline size="small" onClick={this.gotoLogin}>登录</Button>
            }
          </Flex>  
        </WingBlank>
      </Flex>
      <Flex className='wx-my-menu1'>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/1')
          }}
          >
          关注的商品<br />{memberDetail && memberDetail.favGoodsCount || 0}
        </Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/attention/2')
          }}
          >关注的店铺<br />{memberDetail && memberDetail.favStoreCount || 0}</Flex.Item>
        <Flex.Item
          onClick={() => {
            this.props.router.push('/viewRecord')
          }}
          >浏览记录<br />{memberDetail && memberDetail.browseCount || 0}</Flex.Item>
      </Flex>
      <List renderHeader={
        <Flex justify='between'>
          <div><IconClass url={'./assets/img/mine_order.png'}></IconClass><div style={{display:'inline-block',float:'right',marginTop:'0.10rem'}}>我的订单</div></div>
          <Flex onClick={this.gotoOrderList}>
            全部订单<Icon type='right'/>
          </Flex>  
        </Flex>
        }>
        <Grid data={orderMenu}
          columnNum={4} hasLine={false}
          onClick={this.onOrderMenuClick}
          renderItem={this.renderItem}>
        </Grid>  
      </List>
      <List className='wx-my-moneybag' renderHeader={
      	<Flex justify='between'>
          <div><IconClass url={'./assets/img/mine_order.png'}></IconClass><div style={{display:'inline-block',float:'right',marginTop:'0.10rem'}}>我的钱包</div></div> 
        </Flex>}>
        <Flex style={{height:'1.2rem'}}>
          <Flex.Item onClick={() => {
              this.props.router.push('/balance')
            }}>
            {memberDetail && memberDetail.availablePredeposit || 0}
            <br />
            可用余额</Flex.Item>
          <Flex.Item onClick={() => {
              this.props.router.push('/myIntegral')
            }}>
            {memberDetail && memberDetail.memberConsumePoints || 0}
            <br />
            积分纪录</Flex.Item>
          <Flex.Item onClick={() => {
              this.props.router.push('/lockBalance')
            }}>
            {memberDetail && memberDetail.freezePredeposit || 0}
            <br />
            锁定余额</Flex.Item>
          <Flex.Item onClick={() => {
              this.props.router.push('/coupon')
            }}>
            {memberDetail && memberDetail.couponCount || 0}
            <br />
            优惠券</Flex.Item>   
        </Flex>
      </List>

      <WhiteSpace></WhiteSpace>      
      <WingBlank style={{color:'#888'}}>
        <Flex justify='between' onClick={()=>this.props.router.push('/account')}>
          <div><IconClass url={'./assets/img/mine_manage.png'}></IconClass><div style={{display:'inline-block',float:'right',marginTop:'0.10rem'}}>账户管理</div></div>           
            <Icon type='right'/>
        </Flex>
      </WingBlank>
      
      <RecommendGoods data={this.state.relGoodsRecommedlist}></RecommendGoods>
    </div>
  }
}

export default withRouter(My);
