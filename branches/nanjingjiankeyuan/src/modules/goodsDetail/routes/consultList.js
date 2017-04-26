import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Icon,
  ListView
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as goodsDetailApi from '../api/goodsDetail';
import comment from 'svg/comment.svg';

import './consultList.less';

let pageNo = 1;

class ConsultList extends Component {

  static contextTypes = {
    initAction: React.PropTypes.func,
    clearAction: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.consultList = []

    this.state = {
      hasMore: false,
      isLoading: false,
      dataSource: this.ds.cloneWithRows(this.consultList)
    }
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  refreshList = (currentPageNo = 1) => {
    goodsDetailApi.goodsConsultList({
      goodsId: this.props.params.goodsId,
      pageNo: currentPageNo
    }).then(result => {
      if (result.result == 1) {
        const data = result.data || [];
        let hasMore = true;
        if (data.length < 10) {
          hasMore = false;
        }
        this.consultList = [...this.consultList, ...data];
        this.setState({
          isLoading: false,
          hasMore,
          dataSource: this.ds.cloneWithRows(this.consultList)
        })
      }
    })
  }

  componentDidMount() {
    // 绑定头部事件
    this.context.initAction({
      title: <Icon type={comment} onClick={() => {
        this.props.router.push('/consultEdit/'+this.props.params.goodsId);
      }} />
    })
    this.refreshList();
  }

  renderItem = (item) => {
    return <div style={{width:'100%'}}>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between'>
          <div>
            {item.isanonymous ? <span style={{ width: '.36rem' }}>&nbsp;</span>
              : <Img src={item.memberImg} style={{ width: '.36rem', height: '.36rem' }} />}
            <span>{item.cmemberName}</span>
          </div>
          <span>{item.createTimeStr}</span>
        </Flex>
        <p>咨询内容:</p>
        <p style={{width:'80%',display:'inline-block',wordWrap:'break-word'}}>
            {item.consultContent}
            </p>
      </WingBlank>
      <WhiteSpace></WhiteSpace>
    </div>
  }

  onEndReached = () => {
    console.log(this.state.isLoading, this.state.hasMore);
    if (!this.state.hasMore || this.state.isLoading) {
      return;
    }
    this.setState({
      isLoading: true
    });

    this.refreshList(++pageNo);
  }

  render() {
    const { consultList } = this.state;
    const footer = <div style={{
      textAlign: 'center'
    }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;
    return (
      <div className='wx-ConsultList fix-scroll hastitle'>
        <ListView
          style={{
            height: '100%'
          }}
          pageSize={10}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={200}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}></ListView>
      </div>
    )
  }
}

export default withRouter(ConsultList);
