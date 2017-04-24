import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { queryIndexData } from '../api';
import HomeCarouselBlock from '../components/HomeCarouselBlock'
import HomeFunctionBlock from '../components/HomeFunctionBlock'
import HomePromotionBlock from '../components/HomePromotionBlock'
import HomeFloorGoods from '../components/HomeFloorGoods';
import HomeNewGoodsBlock from '../components/HomeNewGoodsBlock';
import HomeRecommendGoods from 'commonComponent/RecommendGoods';

import './home.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floorList: [],
      relGoodsRecommedlist: [],
      activityBeenList: [], //
      advList: [], // 轮播
      navigationList: [],
      recommendGoodslist: []
    }
  }

  componentWillMount() {
    Toast.loading();
    queryIndexData().then(result => {
      Toast.hide();
      let data = result.data[0];
      this.setState({
        advList: data.advPosition.advList,
        activityBeenList: data.activityBeenList,
        recommendGoodslist: data.recommendGoodslist,
        relGoodsRecommedlist: data.relGoodsRecommedlist,
        floorList: data.floorList
      });
    });
  }

  onSearch = () => {
    this.props.router.push('/gotoSearch');
  }

  render() {
    const {
      floorList,
      relGoodsRecommedlist,
      activityBeenList,
      advPosition,
      recommendGoodslist
    } = this.state;
    return (
      <div className='wx-index fix-scroll'>
        <div onClick={this.onSearch} className='index-search'><SearchBar placeholder="搜索你想要的商品" disabled ></SearchBar></div>
        <HomeCarouselBlock data={this.state.advList}></HomeCarouselBlock>
        <HomeFunctionBlock></HomeFunctionBlock>
        {
          this.state.activityBeenList && this.state.activityBeenList.map(activityBeen=>{
            return <HomePromotionBlock key={activityBeen.activityTypeValue} data={activityBeen}></HomePromotionBlock>
          })
        } 
        <HomeNewGoodsBlock data={this.state.recommendGoodslist}></HomeNewGoodsBlock>
        {
          this.state.floorList && this.state.floorList.map((floor,index)=>{
            return <HomeFloorGoods key={index} data={floor}></HomeFloorGoods>
          })
        } 
        <HomeRecommendGoods data={this.state.relGoodsRecommedlist}></HomeRecommendGoods>
      </div>
    )
  }
}

export default withRouter(Home);
