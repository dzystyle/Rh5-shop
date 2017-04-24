import React, { Component } from 'react';
import { Grid, Flex, List, WhiteSpace, Modal } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

class HomePromotionBlock extends React.PureComponent {

  onClick = (el, data) => {
    if (data.activityName == '团购') {
      window.location.href = `groupBuy.html#/groupBuy/${data.activityTypeValue}`;
    } else if (data.activityName == '限时抢购') {
      window.location.href = `timeBuy.html#/timeBuy/${data.activityTypeValue}`;
    }
  }

  renderItem = (dataItem) => {
  	const IconClass = ({ url }) => {
		  return <div style={{
		    width: '1.3rem',
		    height: '1.3rem',
		    background: `url(${url}) center center /  1.3rem 1.3rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return <Flex direction='column' style={{textAlign:'center'}}>
      <Flex.Item>
        {dataItem.goodsImage==undefined||dataItem.goodsImage==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
      	<Img src={dataItem.goodsImage}
        style={{ width: '1.3rem', height:'1.3rem' }} />}
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'.24rem',color:'red',paddingTop:'.2rem'}}>{`¥${dataItem.price}`}</span>
      </Flex.Item>
      <Flex.Item>
        <span style={{fontSize:'.24rem',textDecoration:'line-through',color:'gray',paddingBottom:'.2rem'}}>{`¥${dataItem.specGoodsPrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { data } = this.props;
    let objectUnionVOList = data.objectUnionVOList;
    if (objectUnionVOList && objectUnionVOList.length > 4) {
      objectUnionVOList = objectUnionVOList.slice(0, 4);
    }
    return <List renderHeader={() => (
      <div>
        <span style={{color:'red'}}>{data.activityName}</span>
        <span style={{fontSize:'.24rem'}}>&nbsp;{data.activityTypeName}</span>
      </div>
    )}>
      <List.Item>
      <Grid data={objectUnionVOList} columnNum={4} hasLine={false}
        onClick={(el,index)=>this.onClick(el,data)}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
        </Grid>
      </List.Item>  
    </List>
  }
}

export default HomePromotionBlock;
