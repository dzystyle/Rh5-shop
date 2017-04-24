import React, { Component } from 'react'
import {
  Tabs,
  Grid,
  Flex
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
const TabPane = Tabs.TabPane;

const onClick = (el) => {
  common.gotoGoodsDetail({ specId: el.specId });
}

const renderItem = (dataItem) => {
  return <Flex style={{ textAlign: 'center' }} direction='column' >
      <div>
          <Flex.Item>
              <Img src={dataItem.goodsImage} style={{ height:'2rem',width:'2rem' }} />
          </Flex.Item>
      </div>

          <Flex.Item>
              <span>{dataItem.gcName}</span>
          </Flex.Item>

      <div>
          <Flex.Item>
              <div style={{ fontSize: '.24rem',width:'1.8rem', color: 'gray' }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
          </Flex.Item>
      </div>
      <Flex.Item>
        <span style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
}

/**
 * 商品更多信息
 * @param {*} param0 
 */
export default function({ goodsDetailInfo }) {
  return <Tabs defaultActiveKey="1" activeTextColor='#E43F47' activeUnderlineColor='#E43F47' swipeable={false} > 
    <TabPane tab="猜你喜欢" key="1">
      {
        goodsDetailInfo.recommendList &&
        <Grid
          onClick={onClick}  
          renderItem={(dataItem, index) => (renderItem(dataItem))}
          data={goodsDetailInfo.recommendList} columnNum={3} >
      </Grid>
      }
    </TabPane>
    <TabPane tab="排行榜" key="2">
      {
        goodsDetailInfo.orderList &&
        <Grid
          onClick={onClick}  
          renderItem={(dataItem, index) => (renderItem(dataItem))}
          data={goodsDetailInfo.orderList} columnNum={3} >
      </Grid>
      }
    </TabPane>
  </Tabs>
}
