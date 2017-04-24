import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon } from 'antd-mobile';
import * as goodsDetailApi from '../api/goodsDetail';
import classnames from 'classnames';

import './GoodsSpec.less'

class SpecGroup extends React.PureComponent {

  render() {
    const { values, selectedValue, onChangeSpec } = this.props;
    return <div className='wx-goods-detail-spec-group'>
      {
        values.map((value, index) => {
          const tagClass = classnames('am-tag', {
            'am-tag-active': selectedValue.includes(value.spValueId),
            'am-tag-normal': !selectedValue.includes(value.spValueId)
          })  
          return <div key={index} onClick={() => onChangeSpec(value)} className={tagClass} style={{ marginLeft: '0.18rem' }}>
            <div className="am-tag-text">{value.spValueName}</div>
          </div>
        })
      }
    </div>
  }
}

class GoodsSpec extends React.PureComponent {

  constructor(props) {
    super();
    // console.log('props', props);
    this.state = {
      goodsSpecValueAll: props.goodsDetailInfo.goodsSpecValueAll,
      goodsSpec: props.goodsDetailInfo.goodsSpec,
      specName: props.goodsDetailInfo.specName,
      goodsId: props.goodsDetailInfo.goodsId,
      goodsName: props.goodsDetailInfo.goodsName,
      goodsImage: props.goodsDetailInfo.goodsImage,
      buyCount: props.buyCount
    }
  }

  renderHeader = () => {
    const { goodsImage, goodsSpec, goodsName } = this.state;
    return <div>
      <div style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute', right: 3, top: -5,
          }}
          onClick={() => this.props.onClose('cancel')}>
          <Icon type="cross" />
        </span>
      </div>
      <Flex style={{ height: '200px' }}>  
        <Flex.Item style={{flex:1}}>
          <Img src={goodsImage} style={{height:'200px'}}></Img>
        </Flex.Item>  
        <Flex.Item style={{flex:2}}>
          <div style={{color:'red'}}>{`¥${goodsSpec.specGoodsPrice}`}</div>
          <div>{goodsName}</div>
        </Flex.Item> 
      </Flex>
    </div>
  }

  onChangeSpec = (spec) => {
    const { goodsSpec, goodsSpecValueAll } = this.state;
    // 当前选择的所有规则
    let currentSpecs = goodsSpec.specGoodsSpec;
    // 删除当前规则组的所有子选项
    const goodsSpecValueGroup = goodsSpecValueAll[spec.spId];
    // 只有1个规则项，不做处理
    if (goodsSpecValueGroup.length == 1) {
      // console.log(this.refs[`specGroup-${spec.spId}`]);
      // const currentGroup = this.refs[`specGroup-${spec.spId}`];
      return;
    } else {
      //  当前规则组 ，存在多个规则时 切换处理
      goodsSpecValueAll[spec.spId].forEach(item => {
        delete currentSpecs[item.spValueId]
      })
      this.onChangeNum(1);
      // 添加当前规则到 已选择的规则
      currentSpecs[spec.spValueId] = spec.spValueName
      const specIds = Object.keys(currentSpecs).join()
      goodsDetailApi.getSpecByGoodsIdAndSpecIds({
        goodsId: goodsSpec.goodsId,
        specIds
      }).then(result => {
        if (result.result == 1) {
          const data = result.data[0]
          // 更新组件相关数据
          this.setState({
            goodsSpec: {
              ...this.state.goodsSpec,
              specGoodsPrice: data.price,
              specGoodsStorage: data.num,
              goodsSpecId: data.specId
            }
          })
          // 同步状态到外部页面
          this.props.onChangeSpec(currentSpecs, data);
        }
      })
    }
  }

  onChangeNum = (num) => {
    this.setState({
      buyCount: num
    })
    this.props.onChangeBuyNum(num);
  }

  addCart = () => {
    this.props.addCart(this.state.buyCount)
  }

  gotoBuy = () => {
    this.props.gotoBuy(this.state.buyCount)
  }

  render() {
    // 获取规格属性
    const {
      goodsSpecValueAll, // 所有的规格属性
      goodsSpec, // 当前选择的规格值  
      specName,
      goodsName,
      goodsImage,
    } = this.state;
    // 当前选中的规格
    const { specGoodsSpec } = goodsSpec;

    return <div style={{ marginBottom: '1.1rem'}}>
      <List renderHeader={() => (this.renderHeader())}>
        {
          Object.keys(goodsSpecValueAll).map(key => {
            const values = goodsSpecValueAll[key]
            const selected = values.filter(value => {
              return Object.keys(specGoodsSpec).includes(value.spValueId)
            }).map(value => value.spValueId);
            
            return <List.Item key={key}>
              <Flex direction='column' align='start'>
                <Flex.Item>{specName[key]}</Flex.Item>
                <Flex.Item>
                  <SpecGroup ref={`specGroup-${key}`} specGoodsSpec={specGoodsSpec}
                    selectedValue={selected}  
                    values={values} onChangeSpec={this.onChangeSpec}></SpecGroup>
                </Flex.Item>  
              </Flex>
            </List.Item>
          })  
        }  
        <List.Item extra={
          <Stepper ref='stepper'
            style={{ width: '50%', minWidth: '2rem' }}
            showNumber min={0}
            max={parseInt(goodsSpec.specGoodsStorage)}
            size="small"
            onChange={this.onChangeNum}
            value={this.state.buyCount} />
          }>数量</List.Item>
        <List.Item>库存:{goodsSpec.specGoodsStorage}</List.Item>
        
      </List>
      <CartBar
        gotoBuy={this.gotoBuy}
        addCart={this.addCart}
      ></CartBar>
    </div>
  }
}

export default GoodsSpec;
