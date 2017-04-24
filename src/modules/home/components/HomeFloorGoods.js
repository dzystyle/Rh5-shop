import React, { Component } from 'react';
import { Grid, List, Flex, Icon } from 'antd-mobile';
import { Img } from 'commonComponent';
import { ImgGoodsInfo, GoodsImgInfo } from './GoodsInfo';
import { withRouter } from 'react-router'
const IconClass = ({ url }) => {
  return <div style={{
    width: '0.50rem',
    height: '0.50rem',
    background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`,
    display:'inline-block',
    marginRight:'0.1rem'
  }}
  />
}
class HomeFloorGoods extends React.PureComponent {

  renderHeader = (data) => {
    return <Flex justify='between'>
      <div><IconClass url={'./assets/img/clothingIcon.png'}></IconClass><div style={{display:'inline-block',float:'right',marginTop:'0.10rem'}}>{data.floorName}</div></div>
      <Flex onClick={() => {
          this.props.router.push(`/search/gcIdSearch/${data.gcId}`)
      }}
       >更多<Icon type='right' size='xs'></Icon></Flex>
    </Flex>
  }

  render() {
    const { data } = this.props;
    let firstBlock = null;
    let sencondBlock = null;

    if (data.floorType == '2*8') {
      firstBlock = <Grid data={data.goodsList.slice(0,2)} columnNum={2}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
          <ImgGoodsInfo dataItem={dataItem} columnNum={2}></ImgGoodsInfo>
          )}>
      </Grid>

      sencondBlock = <Grid data={data.goodsList.slice(2,10)} columnNum={4}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem} columnNum={4}></ImgGoodsInfo>
          )}>
      </Grid>
    } else if (data.floorType == '9') {
      firstBlock = <Grid data={data.goodsList} columnNum={3}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <GoodsImgInfo dataItem={dataItem} columnNum={3}></GoodsImgInfo>
          )}>
      </Grid>
    } else {
      firstBlock = <Grid data={data.goodsList.slice(0,4)} columnNum={2}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem} columnNum={2}></ImgGoodsInfo>
          )}>
      </Grid>

      sencondBlock = data.goodsList.length > 4 && <Grid data={data.goodsList.slice(4,10)} columnNum={4}
        onClick={this.onClick}
          renderItem={(dataItem,index)=>(
            <ImgGoodsInfo dataItem={dataItem} columnNum={4}></ImgGoodsInfo>
          )}>
      </Grid>
    }

    let advContent = null
    if (data.advPosition && data.advPosition.advList && data.advPosition.advList.length > 0) {
      advContent = <a href={data.advPosition.advList[0].advUrl}><Img src={data.advPosition.advList[0].resUrl} style={{width:'100%',marginBottom:'-8px'}}/></a>
    }

    return <List renderHeader={() => this.renderHeader(data) }>
      <List.Item>
        {firstBlock}
      </List.Item>
      { sencondBlock && <List.Item>{sencondBlock}</List.Item> }
      {advContent}
    </List>
  }
}

export default withRouter(HomeFloorGoods);
