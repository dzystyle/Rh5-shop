import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
  Grid
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as storeApi from '../../api/store';

import './store.less';

const Item = List.Item;

class StoreNewGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
    }
  }

  componentDidMount() {
    storeApi.storegoods({
      order: 'asc',
      orderField: 'new',
      goodsType: 1,
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          goodsList: data,
        })
      }
    });
  }

  onClick = (dataItem) => {
    common.gotoGoodsDetail({ specId: dataItem.specId })
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{ padding: '0.1rem' }} >
      <div>
        <Flex.Item style={{textAlign:'center'}}>
          <Img src={dataItem.goodsImage} style={{ width: '3rem',height:'3rem' }} />
        </Flex.Item>
      </div>
      <div>
        <Flex.Item>
          <div style={{
              fontSize: '.24rem',
              height: '0.8rem',
              lineHeight: '0.4rem',
              overflow:'hidden'
          }}>{dataItem.goodsName}</div>
        </Flex.Item>
      </div>
      <Flex.Item>
        <span style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { goodsList } = this.state;
    return <div className='wx-storegoods'>
      <Grid data={this.state.goodsList} columnNum={2}
        onClick={(el,index)=>this.onClick(el)}
          renderItem={(dataItem,index)=>(this.renderItem(dataItem))}>
      </Grid>
    </div>
  }
}

export default withRouter(StoreNewGoods);
