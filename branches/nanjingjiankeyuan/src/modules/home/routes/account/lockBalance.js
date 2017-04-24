import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../../api/member';

class LockBalance extends Component {

  state = {
    memberDetail: null
  }

  componentDidMount() {
    memberApi.memberDetail().then(result => {
      if (result.result == 1 && result.data && result.data.length > 0) {
        this.setState({
          memberDetail: result.data[0]
        });
      }
    })
  }

  render() {
    const { memberDetail } = this.state;
    if (!memberDetail) {
      return null;
    }
    return (
      <div>
        <Flex style={{height:'2rem',backgroundColor:'white',paddingLeft:'.4rem'}}>
          <Flex.Item>锁定余额</Flex.Item>
          <Flex.Item style={{color:'red',fontSize:'.28rem'}}>{`￥${memberDetail.freezePredeposit}`}</Flex.Item>
        </Flex>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <div>提示：手机账户余额仅支持最大化使用</div>
        </WingBlank>
      </div>
    );
  }
}

export default withRouter(LockBalance);
