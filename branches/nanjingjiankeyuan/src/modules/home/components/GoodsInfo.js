import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

const onClick = (el) => {
  common.gotoGoodsDetail({ specId: el.specId });
}

/**图片在上面，文字在下面的布局 */
export function ImgGoodsInfo({ dataItem, columnNum }) {
  const styles = {
    fontSize: '.24rem',
    color: 'gray',
      paddingLeft:'20px',
      paddingRight:'20px'
  }
  return <Flex direction='column' onClick={() => onClick(dataItem)} style={{
      textAlign: 'center',paddingBottom:'20px'
    }}>
    <Flex.Item>
      <Img src={dataItem.goodsImage} style={{width:'100%',height:'100%' }} />
    </Flex.Item>
    <Flex.Item style={{width:'100%'}}>
      <div style={styles} className='text-overflow-hidden'>{dataItem.goodsName}</div> 
    </Flex.Item>
    <Flex.Item>
      <div style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsPrice}`}</div>
    </Flex.Item>
  </Flex>
}

/**文字在上面，图片在下面的布局 */
export function GoodsImgInfo({ dataItem, columnNum }) {
  const styles = {
    fontSize: '.24rem',
    color: 'gray'
  }
  return <Flex direction='column' style={{textAlign:'center'}} onClick={()=>onClick(dataItem)} >
    <div>
      <Flex.Item>
        <div style={{fontSize:'.24rem'}} className='text-overflow-hidden'> {dataItem.gcName}</div>
      </Flex.Item>
    </div>
    <Flex.Item style={{width:'100%'}}>
      <div style={styles} className='text-overflow-hidden'>{dataItem.goodsName}</div>
    </Flex.Item>
    <Flex.Item>
      <Img src={dataItem.goodsImage} style={{width:'100%',height:'100%' }} />
    </Flex.Item>
  </Flex>
}
