import React, { Component } from 'react';
import { Grid, Flex, WhiteSpace, List } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

const IconClass = ({ url }) => {
  return <div style={{
    width: '0.50rem',
    height: '0.50rem',
    background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`,
    float:'left',
    marginRight:'0.1rem'
  }}
  />
}
class HomeNewGoodsBlock extends React.PureComponent {

  onClick = (el, index) => {
    // console.log(el);
    common.gotoGoodsDetail({ specId: el.specId });
  }

  renderItem = (dataItem) => {
    return<Flex direction='column' style={{fontSize:'.24rem'}}>
      <div><Flex.Item>
        <div style={{fontSize:'.28rem'}}>{dataItem.gcName}</div>
      </Flex.Item></div>
      <Flex.Item style={{width:'90%'}}>
        <div style={{
            color: 'gray',textAlign:'center',paddingLeft:'10px',paddingRight:'10px'
        }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
      </Flex.Item>
      <Flex.Item>
        <Img src={dataItem.goodsImage} style={{width:'2rem', height:'2rem' }} />
      </Flex.Item>
    </Flex>

  }

  render() {
    const { data } = this.props;
    return <List renderHeader={() => <div><IconClass url={'./assets/img/floor.png'}></IconClass><div style={{float:'left',marginTop:'0.10rem'}}>新品上市</div></div>}>
      <List.Item>
        <Grid data={data.slice(0,6)} columnNum={3}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
        </Grid>
      </List.Item>  
    </List>
  }
}

export default HomeNewGoodsBlock;
