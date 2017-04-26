import React, { Component } from 'react';
import { Grid, Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import { Img } from 'commonComponent';
import { withRouter } from 'react-router'
import './HomeFunctionBlock.less';

class HomeFunctionBlock extends React.PureComponent {
  onClick = (el, index) => {
    switch (index) {
      case 0:
        window.location.href = 'goodsClass.html'
        break;
      case 1:
        window.location.href = 'cart.html'
        break;
      case 2:
        this.props.router.push('/attention/1');
        break;
      case 3:
        this.props.router.push('/attention/2');
        break;
      case 4:
        this.props.router.push('/viewRecord');
        break;
      case 5:
        this.props.router.push('/afterSale');
        break;
      case 6:
        this.props.router.push('/myIntegral');
        break;
      case 7:
        this.props.router.push('/coupon');
        break;
      case 8:
        window.location.href = 'circle.html'
        break;
      case 9:
        window.location.href = 'content.html'
        break;
    }
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{padding:'0.1rem'}} >
      <WhiteSpace></WhiteSpace>
      <Flex.Item style={{textAlign:'center',marginLeft:'0'}}>
        <img src={dataItem.icon} style={{ height:'0.8rem' }} />
      </Flex.Item>
      <WhiteSpace></WhiteSpace>
      <Flex.Item style={{ textAlign: 'center', marginLeft: '0', fontSize: '0.24rem' }}>
        <div>{dataItem.text}</div>
      </Flex.Item>
    </Flex>
  }

  render() {
    const url = 'http://bbc.leimingtech.com/'
    const data = [{
        icon: `${url}/res_v4.0/h5/images/i_1.png`,
        text: `分类`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_2.png`,
        text: `购物车`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_3.png`,
        text: `关注商品`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_4.png`,
        text: `关注店铺`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_5.png`,
        text: `浏览记录`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_6.png`,
        text: `退换货`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_7.png`,
        text: `积分`,
      }, {
        icon: `${url}/res_v4.0/h5/images/i_8.png`,
        text: `优惠券`,
      },
      {
        icon: './assets/img/circle.png',
        text: `圈子`,
      }, {
        icon: './assets/img/content.png',
        text: `资讯`,
      }
    ]

    return (
      <Grid data={data} columnNum={5} hasLine={false}
        onClick={this.onClick}
        renderItem={(dataItem) => (this.renderItem(dataItem))} />
    )
  }
}

export default withRouter(HomeFunctionBlock);
