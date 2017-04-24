import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../../api/member';

class Balance extends Component {

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
      <WingBlank>
        <Flex style={{height:'2rem'}}>
          <Flex.Item>可用余额</Flex.Item>
          <Flex.Item style={{color:'red',fontSize:'.28rem'}}>{`￥${memberDetail.availablePredeposit}`}</Flex.Item>
        </Flex>
        <Button onClick={() => {
          this.props.router.push('/recharge')
          }} type='primary'>充值</Button>
      </WingBlank>
    );
  }
}

export default withRouter(Balance);
