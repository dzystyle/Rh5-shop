import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Carousel, Modal, SearchBar, WhiteSpace, WingBlank, Toast, Flex } from 'antd-mobile';
import * as goodsClassApi from '../api/goods';
import GoodsClassMenu from '../components/GoodsClassMenu';
import GoodsList from '../components/GoodsList';

import './goodsClass.less';

class GoodsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      goodsList: []
    }
  }

  componentDidMount() {
    // Toast.loading();
    goodsClassApi.queryClasslist().then(result => {
      // Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data;
      this.setState({
        classList: data
      });

      if (data && data.length > 0) {
        this.onMenuChange(data[0]);
      }
    });
  }

  onMenuChange = ({ gcAdvid, gcId }) => {
    // 设置滚动条
    const classList = this.refs.classList
    classList.scrollTop = 0;

    goodsClassApi.getGoodsClass({ advid: gcAdvid, pId: gcId }).then(result => {
      this.setState({
        goodsList: result.data[0]
      });
    });
  }

  onGoodsClassClick = (item) => {
    let url = `home.html#/search/gcIdSearch/${item.gcId}`
    window.location.href = url;
  }

  render() {
    return (
      <div className='wx-goods-class'>
        <div className='wx-goods-class-menu'>
          <GoodsClassMenu data={this.state.classList} onMenuChange={this.onMenuChange}></GoodsClassMenu>
        </div>
        <div className='wx-goods-class-list'>
          <div ref='classList' className='fix-scroll hasbottom' style={{marginBottom:'0.9rem'}}>
            <GoodsList
              onGoodsClassClick={this.onGoodsClassClick}
              data={this.state.goodsList}></GoodsList>
          </div>
        </div>  
      </div>
    )
  }
}

export default withRouter(GoodsClass);
