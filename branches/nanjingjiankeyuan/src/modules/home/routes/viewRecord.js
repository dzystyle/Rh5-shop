import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  Modal,
  WingBlank,
  Toast,
  Tabs,
  List,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../api/member';
import { common } from 'common';
import { Img } from 'commonComponent';

const TabPane = Tabs.TabPane;

class GoodsViewRecord extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      storeList: [],
      type: "0"
    }
  }

  onClick = (el) => {
    common.gotoGoodsDetail({ specId: el.browseSpecId });
  }

  componentWillMount() {
    this.context.initAction({
      title: '清空',
      action: () => {
        // 清空处理
        Modal.alert('提示', '是否全部清除?', [
          { text: '取消' },
          {
            text: '确定',
            onPress: () => {
              console.log(this.state);
              memberApi.delGoodsBrowseByAll({
                browseState: this.state.type
              }).then(result => {
                Toast.info(result.msg);
                // 刷新页面
                this.onChangeTab(this.state.type);
              });
            }
          }
        ]);
      }
    });
  }

  componentWillUnmount() {
    this.context.clearAction();
  }


  componentDidMount() {
    this.onChangeTab(this.state.type);
  }

  cancelAttention = (item) => {
    const alertInstance = Modal.alert('提示', '确定删除此浏览记录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          memberApi.delGoodsBrowse({
            browseId: item.browseId
          }).then(result => {
            Toast.info(result.msg);
            // 刷新页面
            this.onChangeTab(this.state.type);
          });
        }
      }
    ]);
  }

  onChangeTab = (value) => {
    this.setState({
      type: value
    })

    memberApi.goodsBrowseList({
      browseState: value,
      pageno: 1,
      pageSize: 10000
    }).then(result => {
      if (result.result == 1) {
        if (value == "0") {
          this.setState({
            goodsList: result.data
          })
        } else {
          this.setState({
            storeList: result.data
          })
        }
      }
    })
  }

  render() {
    const {
      goodsList,
      storeList,
      recommendGoodsList,
      type
    } = this.state;
    return (
      <div className='wx-attention fix-scroll'>
        <Tabs swipeable={false} defaultActiveKey={type} onChange={this.onChangeTab} style={{marginTop:'0.9rem'}}>
          <TabPane tab="商品浏览记录" key="0">
            <List>
              {
                goodsList && goodsList.map((item, index) => <List.Item
                  key={index}>
                  <Flex>
                    <Flex.Item
                      onClick={()=>this.onClick(item)}
                      style={{ flex: 1 }}><Img src={item.browseGoodsImage} style={{ width: '100%', height: '100%' }} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div onClick={() => this.onClick(item)} style={{
                        whiteSpace: 'normal',
                        height: '1rem',
                        lineHeight: '0.5rem',
                        overflow: 'hidden'
                      }}>{item.browseGoodsName}</div>
                      <div onClick={()=>this.onClick(item)} style={{color:'red'}}>¥{item.browseGoodsPrice}</div>
                      <div style={{ textAlign: 'right' }}>
                        <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)}>删除</Button>
                      </div>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }
            </List>
            
          </TabPane>
          <TabPane tab="店铺浏览记录" key="1">
            <List>
              {
                storeList && storeList.map((item, index) => <List.Item
                  key={index}>
                  <Flex>
                    <Flex.Item
                      onClick={() => { 
                        this.props.router.push(`/store/${item.storeId}/index`)
                      }}
                      style={{ flex: 1 }}><Img src={item.storeLogo} style={{ width: '100%', height: '100%' }} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div
                        onClick={() => { 
                          this.props.router.push(`/store/${item.storeId}/index`)
                        }}
                      >{item.storeName}</div>
                      <div style={{ textAlign: 'right' }}>
                        <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)}>删除</Button>
                      </div>
                    </Flex.Item>
                  </Flex> 
                </List.Item>)
              }
            </List>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(GoodsViewRecord);
