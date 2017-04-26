import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Tabs,
  Button,
  ListView
} from 'antd-mobile';
import * as timeBuyApi from '../api/timeBuy';
import { Img } from 'commonComponent';
import { common } from 'common';

import './timeBuy.less';

const TabPane = Tabs.TabPane;

class TimeBuy extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.timer = null;
    this.state = {
      qiangClass: [],
      defaultActiveClass: props.params.activityClass,
      dataSource: this.ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    // 获取分类TAB
    timeBuyApi.flashSaleApiList({
      activityClass: this.state.defaultActiveClass,
      pageNo: 1,
      activityType: 60,
      pageSize: 1,
    }).then(result => {
      if (result.result == 1) {
        const qiangClass = result.data[0].qiangClass
        if (qiangClass && qiangClass.length > 0) {
          this.setState({
            qiangClass
          });
          this.onTabChange(this.state.defaultActiveClass);
        }
      }
    })
  }

  onTabChange = (activityClass) => {
    timeBuyApi.flashSaleApiList({
      activityClass,
      pageNo: 1,
      activityType: 60,
      pageSize: 15
    }).then(result => {
      if (result.result == 1) {
        const data = result.data[0]
        this.goodsList = data.goodsList;
        this.setState({
          dataSource: this.ds.cloneWithRows(data.goodsList)
        });
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.timer = setInterval(this.countdown, 1000, 1000)
        this.countdown();
      }
    })
  }

  countdown = () => {
    const goodsList = this.goodsList.map(function(dataItem) {
      const currentTime = dataItem.currentTime
      const endTime = dataItem.endTime

      // 秒数
      let seconds = parseInt((endTime - currentTime) / 1000);
      // 总的小时数
      let h = Math.floor(seconds / 60 / 60);
      // 天数
      let d = parseInt(h / 24);
      // 显示的小时数
      let showHour = Math.floor(h - d * 24);
      let m = Math.floor((seconds - h * 60 * 60) / 60);
      let s = Math.floor((seconds - h * 60 * 60 - m * 60));

      if (seconds < 0) {
        h = '0';
        m = '00';
        s = '00';
        d = '00';
        showHour = '00';
      }

      dataItem.currentTime = currentTime + 1000;
      dataItem.countdown = `${d} 天 ${showHour < 10 ? `0${showHour}` :showHour} 时 ${m<10?`0${m}`:m} 分 ${s<10?`0${s}`:s} 秒 `
      return dataItem;
    });
    this.goodsList = goodsList;
    this.setState({
      dataSource: this.ds.cloneWithRows(goodsList)
    })
  }

  renderItem = (dataItem) => {
    return <Flex>
      <Flex.Item style={{flex:1}}>
        <Img src={dataItem.goodsImage} style={{width:'2rem',height:'2rem'}}/>
      </Flex.Item>
      <Flex.Item style={{flex:2}}>
        <p>
          {dataItem.goodsName}
        </p>
        <Flex justify='between' style={{marginRight:'.1rem'}}>
          <div style={{color:'red'}}>{'¥'+dataItem.price}</div>
          <div style={{textDecoration:'line-through'}}>{'¥'+dataItem.specGoodsPrice}</div>
          <Button size='small' inline type='primary' onClick={()=>this.gotoBuy(dataItem)}>马上抢</Button>
        </Flex>
        <Flex justify='end' style={{marginRight:'.1rem'}}>
          <p style={{height:'0.3rem',color:'red'}}>{dataItem.countdown}</p>
        </Flex>
        
      </Flex.Item>
    </Flex>
  }

  gotoBuy = (item) => {
    common.gotoGoodsDetail({
      specId: item.goodsSpecId
    })
  }

  renderHeader = () => {
    const { qiangClass, defaultActiveClass, scrollAdv, goodsList } = this.state;
    return <Tabs swipeable={false} onChange={this.onTabChange} defaultActiveKey={defaultActiveClass}>
      {
        qiangClass.map((item, index) => {
          return <TabPane tab={item.dictionaryName} key={item.dictionaryValue}>
          </TabPane>    
        })
      }
    </Tabs>
  }

  render() {
    const { qiangClass, defaultActiveClass, scrollAdv, goodsList } = this.state;
    if (qiangClass.length == 0) {
      return null;
    }
    return <div className='fix-scroll' style={{
      paddingTop:'0.9rem'
    }}>
      {this.renderHeader()}
      <WhiteSpace></WhiteSpace>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        stickyHeader
        delayTime={10}>
      </ListView>
    </div>
  }
}

export default withRouter(TimeBuy);
