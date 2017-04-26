import React, { Component } from 'react'
import {
  List,
  Flex,
  Button,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

/**
 * 商品评价
 */
export default function({ goodsDetailInfo, gotoEvaluateList, gotoConsultation }) {

  const { evaluateGoodsList } = goodsDetailInfo;

  const goodsEvalue = goodsDetailInfo.evaluate / 5;
  const evalue = goodsEvalue.toFixed(2) * 100
  return <List>
    <List.Item onClick={()=>gotoEvaluateList(goodsDetailInfo)} extra={`${evalue}%好评`} arrow="horizontal">
	      商品评价（ {`${goodsDetailInfo.commentnum}`}）&nbsp;
    </List.Item>
    {
      evaluateGoodsList && evaluateGoodsList.map((item, index) => {
        const gevalImageShow = item.gevalImage && item.gevalImage.split(',').map((image, i) => <Img key={i} src={image} style={{width:'1.5rem',height:'1.5rem'}}/>)
        return <WingBlank key={index}>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <Flex.Item>
              {
                [...Array(item.gevalScore)].map((_, i) => {
                  return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '.36rem',height:'.36rem'  }} />
                })
              }
              {
                [...Array(5-item.gevalScore)].map((_, i) => {
                  return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-off.png`} style={{ width: '.36rem',height:'.36rem' }} />
                })
              }
            </Flex.Item>
            <Flex.Item style={{textAlign:'right'}}>
              {item.gevalFrommembername}
            </Flex.Item>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <div>{item.gevalContent}</div>
          <WhiteSpace></WhiteSpace>
          {
            item.gevalImage && <div>{gevalImageShow}</div>
          }
        </WingBlank>
      })
    }
    <List.Item>
      <Flex>
        <Flex.Item>
          <Button onClick={()=>gotoEvaluateList(goodsDetailInfo)}>商品晒单 ({goodsDetailInfo.commentnum})</Button>
        </Flex.Item>
        <Flex.Item>
          <Button onClick={()=>gotoConsultation(goodsDetailInfo)}>购买咨询 ({goodsDetailInfo.consultationNum})</Button>
        </Flex.Item>
      </Flex>
    </List.Item>
  </List>
}
