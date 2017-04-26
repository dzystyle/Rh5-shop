import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal,
  List
} from 'antd-mobile';

const Item = List.Item;

class ProgressItem extends Component {

  gotoProgressDetail = (orderItem) => {
    if (this.props.type == 0) {
      this.props.router.push(`/progressDetail/${this.props.type}/${orderItem.refundId}`)
    } else {
      this.props.router.push(`/progressDetail/${this.props.type}/${orderItem.barterId}`)
    }
  }

  gotoReturnDetail = (orderItem) => {
    this.props.router.push('/returnDetail/' + orderItem.refundId)
  }

  changeGoods = (orderItem) => {
    Modal.alert('提示', '是否确认换货?', [
      { text: '取消' },
      {
        text: '确认',
        onPress: () => {
          orderApi.finishBarter({
            barterId: orderItem.barterId
          }).then(result => {
            if (result.result == 1) {
              this.props.onFinishBarter();
            } else {
              Toast.info(result.msg);
            }
          })
        }
      },
    ]);
  }

  render() {
    // type 0 代表退货退款列表，1 代表换货
    const { dataItem, type } = this.props;
    // 1 退款 2 退货
    const { refundType, sellerState, refundState, goodsState } = dataItem

    let showReturnBtn = false;
    let showRedundBtn = true;
    let showChangeGoodsBtn = false;
    let showConfirmBtn = false;

    let statusShow = '';
    if (type == 0) {
      if (refundType == 2) {
        if (refundState == 3) {
          statusShow = '已完成'
        } else {
          if (sellerState == 2 && goodsState == 1) {
            showReturnBtn = true;
            statusShow = '商家同意退货'
          } else {
            statusShow = '进行中'
          }
        }
      } else {
        if (refundState == 3) {
          statusShow = '已完成'
        } else {
          if (sellerState == 2 && goodsState == 1) {
            statusShow = '商家同意退款'
          } else {
            statusShow = '进行中'
          }
        }
      }
    } else {
      if (goodsState == 4) {
        statusShow = '进行中'
        showConfirmBtn = true;
        showChangeGoodsBtn = false;
      } else if (goodsState == 5) {
        showConfirmBtn = false;
        showChangeGoodsBtn = false;
        statusShow = '已完成'
      } else if (goodsState == 1 && sellerState == 30) {
        showConfirmBtn = false;
        showChangeGoodsBtn = true;
        statusShow = '商家同意换货'
      } else {
        showConfirmBtn = false;
        showChangeGoodsBtn = false;
        statusShow = '进行中'
      }
    }

    console.log(showChangeGoodsBtn);
    return <div className='progressItem'>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between'>
          <div>{type==0?dataItem.refundSn:dataItem.barterSn}</div>
          <div>
            <Button type='ghost'
              onClick={()=>this.gotoProgressDetail(dataItem)}
              size='small' inline>进度查询</Button>
          </div>
        </Flex>
        <div>
          <p>{dataItem.goodsName}</p>
          <p style={{color:'red'}}>状态: {statusShow}</p>
          <p style={{color:'#bbb'}}>申请时间: {dataItem.createTimeStr}</p>

          {
            type ==0 && <Flex.Item>
              <Flex justify='end'>
                {
                  showReturnBtn && <Button
                    type='ghost'
                    size='small'
                    style={{marginRight:'0.1rem'}}
                    onClick={() => { 
                      this.props.router.push(`/returnGoods/${dataItem.refundId}`)
                    }}
                    inline>退货</Button> 
                }
                {
                  showRedundBtn && <Button size='small'
                    onClick={() => this.gotoReturnDetail(dataItem)}
                    inline>退款详情</Button>
                }
              </Flex>
            </Flex.Item>
          }
          {
            type == 1 && <Flex.Item>
              <Flex justify='end'>
                {
                  showConfirmBtn && <Button
                    type='ghost'
                    size='small'
                    onClick={() => { 
                      this.changeGoods(dataItem)
                    }}
                    inline>确认换货</Button> 
                }
                {
                  showChangeGoodsBtn && <Button
                    type='ghost'
                    size='small'
                    onClick={() => { 
                      this.props.router.push(`/changeGoods/${dataItem.barterId}`)
                    }}
                    inline>换货</Button> 
                }
              </Flex>
            </Flex.Item> 
          }
        </div>
      </WingBlank>
      <WhiteSpace></WhiteSpace>
      <WhiteSpace style={{
        height: '0.2rem',
        backgroundColor:'#ebebef'
      }}></WhiteSpace>
    </div>
  }
}

export default withRouter(ProgressItem);
