import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import OrderItem from '../components/OrderItem';
import * as orderApi from '../api/order';

import './comment.less';

class CommentList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { orderItem } = this.props.location.state;

    return (
      <div className="wx-commentList">
        <WhiteSpace></WhiteSpace>
        {
          orderItem.orderGoodsList.map(goods => {
            let showEvaluationBtn = goods.evaluationStatus == 1
            return <WingBlank key={goods.specId}>
              <Flex style={{backgroundColor:'white'}}>
                <Img src={goods.goodsImage} style={{width:'2rem',height:'2rem'}} />
                <Flex.Item>
                  <p>{goods.goodsName}</p>
                  <Flex justify='end'>
                    {
                      goods.evaluationStatus==0 ? <Button type='ghost'
                          onClick={() => {
                            this.props.router.push({
                              pathname: '/comment',
                              state: {
                                goods,
                                orderSn:orderItem.orderSn
                              }
                            })
                          }}
                          size='small' inline>评价晒单</Button>
                      : <span>已评价</span>
                    }
                  </Flex>
                </Flex.Item>
              </Flex>
            </WingBlank>  
          })
        }
      </div>
    )
  }
}

export default withRouter(CommentList);
