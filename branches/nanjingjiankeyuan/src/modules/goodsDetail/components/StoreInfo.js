import React, { Component } from 'react'
import {
  List,
  Tabs,
  WingBlank,
  Flex,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;

const gotoStore = (goodsDetailInfo) => {
  common.gotoStore({ storeId: goodsDetailInfo.storeId });
}

/**
 * 商品更多信息
 * @param {*} param0 
 */
export default function({ goodsDetailInfo }) {
  const { evaluateStore, storeId } = goodsDetailInfo;
  return <WingBlank>
    <Flex>
      <Flex.Item style={{ flex: 1 }}>
        <Img src={goodsDetailInfo.storeLabel} style={{width:'100%'}}></Img>
      </Flex.Item>
      <Flex.Item style={{ flex: 2 }}>
        <Flex>
          <Flex.Item style={{ flex: 2 }}><div>{goodsDetailInfo.storeName}<br/><font color='gray'>正品行货,欢迎选购</font></div></Flex.Item>
          <Flex.Item style={{ flex: 1 }}><div style={{ color: 'red', textAlign: 'right' }}>{evaluateStore.averageCredit}</div></Flex.Item>
        </Flex>  
      </Flex.Item>
    </Flex>
    <WhiteSpace></WhiteSpace>  
    <Flex>
      <Flex.Item>
          <Flex direction='column'>
          <Flex.Item>商品{evaluateStore.sevalDesccredit}</Flex.Item>
          <Flex.Item>{goodsDetailInfo.evaluateNum}</Flex.Item>
            <Flex.Item>关注人数</Flex.Item>
          </Flex>
      </Flex.Item>
        <Flex.Item>
          <Flex direction='column'>
            <Flex.Item>服务{evaluateStore.sevalServicecredit}</Flex.Item>
            <Flex.Item>{goodsDetailInfo.storeGoodsNum}</Flex.Item>
            <Flex.Item>全部商品</Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Flex direction='column'>
            <Flex.Item>物流{evaluateStore.sevalDeliverycredit}</Flex.Item>
            <Flex.Item>149</Flex.Item>
            <Flex.Item>店铺动态</Flex.Item>
          </Flex>
      </Flex.Item>  
      </Flex>
    <WhiteSpace></WhiteSpace>  
    {
      storeId != "0" && <Flex>
        <Flex.Item><Button>联系客服</Button></Flex.Item>
        <Flex.Item><Button onClick={() => gotoStore(goodsDetailInfo)}>进入店铺</Button></Flex.Item>
      </Flex>
    }  
  </WingBlank>
}
