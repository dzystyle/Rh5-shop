import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Tabs,
  Grid,
  Button
} from 'antd-mobile';
import * as groupBuyApi from '../api/groupBuy';
import { Img } from 'commonComponent';
import { common } from 'common';

import './groupBuy.less';

const TabPane = Tabs.TabPane;

class GroupBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qiangClass: [],
      defaultActiveClass: props.params.activityClass,
      goodsList: [],
      scrollAdv: null
    }
  }

  componentDidMount() {
    // 获取分类TAB
    groupBuyApi.groupPurchaseList({
      activityClass: this.state.defaultActiveClass,
      pageNo: 1,
      activityType: 50,
      pageSize: 1,
    }).then(result => {
      if (result.result == 1) {
        const qiangClass = result.data[0].qiangClass
        if (qiangClass && qiangClass.length > 0) {
          this.onTabChange(this.state.defaultActiveClass)

          this.setState({
            qiangClass
          });
        }
      }
    })
  }

  onTabChange = (activityClass) => {
    groupBuyApi.groupPurchaseList({
      activityClass,
      pageNo: 1,
      activityType: 50,
      pageSize: 15,
      apKey: 'groupbanner'
    }).then(result => {
      if (result.result == 1) {
        const data = result.data[0]
        this.setState({
          ...data
        });
      }
    })
  }

  renderItem = (dataItem) => {
  	const IconClass = ({ url }) => {
		  return <div style={{
		    width: '2rem',
		    height: '2rem',
		    background: `url(${url}) center center /  2rem 2rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return <div style={{padding:'0 0.1rem',margin:'0.2rem 0'}}>
      {dataItem.goodsImage==undefined||dataItem.goodsImage==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
      	<Img src={dataItem.goodsImage}
        style={{width:'2rem',height:'2rem'}} />}
      <div className='text-overflow-hidden'>{dataItem.goodsName}</div>
      <div>
        <span style={{color:'red'}}>{'¥'+dataItem.price}</span><br/>
        <span style={{textDecoration:'line-through'}}>{'¥'+dataItem.specGoodsPrice}</span>
      </div>
      <Flex justify='end'>
        <Button onClick={()=>this.gotoBuy(dataItem)} size='small' type='primary'>入场疯抢</Button>
      </Flex>
    </div>
  }

  gotoBuy = (item) => {
    common.gotoGoodsDetail({
      specId: item.goodsSpecId
    })
  }

  render() {
    const { qiangClass, defaultActiveClass, scrollAdv, goodsList } = this.state;
    if (qiangClass.length == 0) {
      return null;
    }
    return (
      <div className='wx-group fix-scroll'>
        <Tabs swipeable={false} onChange={this.onTabChange} defaultActiveKey={defaultActiveClass}>
          {
            qiangClass.map((item,index) => {
              return <TabPane tab={item.dictionaryName} key={item.dictionaryValue}>
                <div>
                  <WhiteSpace></WhiteSpace>
                  {
                    scrollAdv && <Carousel className='wx-group-carousel'
                    autoplay={true} infinite dots={false}>
                    {
                      scrollAdv.advList.map((item, index) => (
                        <div key={index}>
                          <a href={item.advUrl}><Img src={item.resUrl} /></a>
                        </div>
                      ))
                    }
                    </Carousel>
                  }
                  <WhiteSpace></WhiteSpace>
                  <Grid data={goodsList} columnNum={3}
                    renderItem={this.renderItem}>
                  </Grid>
                </div>
              </TabPane>    
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default withRouter(GroupBuy);
