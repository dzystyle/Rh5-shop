import React, { Component } from 'react';
import {
  Flex,
  InputItem,
  Button,
  WingBlank,
  WhiteSpace,
  Toast
} from 'antd-mobile';
import { Img } from 'commonComponent';

import './GoodsSearchSpecFilter.less'

class GoodsSearchSpecFilter extends Component {

  // 点击规格值
  onClickSpValue = (spec, value) => {
    this.props.onClickSpValue(spec, value);
  }

  reset = () => {
    this.props.resetSpec();
  }

  onChangePrice = (type, val) => {
    // 最低价
    if (type == 1) {
      this.props.changePrice({
        minimumPrice: val
      });
    } else {
      this.props.changePrice({
        maximumPrice: val
      });
    }
  }

  submit = () => {
    const { specList, maximumPrice, minimumPrice } = this.props;
    // 最低最高
    if (maximumPrice != '' && minimumPrice == '') {
      Toast.info('最低价不能为空', 1)
      return;
    } else if (minimumPrice != '' && maximumPrice == '') {
      Toast.info('最高价不能为空', 1)
      return;
    } else if (minimumPrice != '' && maximumPrice != '' &&
      minimumPrice >= maximumPrice) {
      Toast.info('最低价不能大于最高价', 1)
      return;
    }
    console.log(minimumPrice, maximumPrice);
    this.props.filterBySpec();
  }

  render() {
    const { specList, maximumPrice, minimumPrice } = this.props;
    return <div className='wx-GoodsSearchSpecFilter'>
      <div className='price-filter'>
        <Flex>
          <InputItem
            onChange={(val) => this.onChangePrice(1, val)}  
            placeholder="最低价"
            type='number'
            value={minimumPrice}
          ></InputItem>
          <InputItem
            type='number'  
            value={maximumPrice}  
            onChange={(val)=>this.onChangePrice(2,val)}  
            placeholder="最高价"
          ></InputItem>
        </Flex>
      </div>  
      <div className='fix-scroll spec-value-list'>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
        {
          specList.map((spec, index) => {
            
            return <div key={index}>
              <WhiteSpace></WhiteSpace>
              <div style={{fontSize:'0.3rem'}}>{spec.spName}</div>
              <WhiteSpace></WhiteSpace>
              <Flex wrap="wrap">
                {
                  spec.specValueList.map((value,i) => {
                    let type = 'ghost'
                    if (value.checked) {
                      type = 'primary'  
                    }
                    return <div key={i} className='spec-value'>
                      <Button style={{width:'1.4rem',height:'0.8rem',fontSize:'0.24rem'}} onClick={() => this.onClickSpValue(spec, value)}
                        type={type}>{value.spValueName}</Button>
                    </div>  
                  })
                }
              </Flex>
            </div>
          })
        }
        </WingBlank>
      </div>
      <Flex className='spec-btn'>
        <Flex.Item>
            <Button onClick={this.reset}>重置</Button>
        </Flex.Item>
        <Flex.Item>
          <Button type='primary' onClick={this.submit}>确定</Button>
        </Flex.Item>
      </Flex>
    </div>
  }
}

export default GoodsSearchSpecFilter;
