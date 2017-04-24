import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button,
  InputItem,
  Toast
} from 'antd-mobile';
import * as memberApi from '../../api/member';

class UpdateNickName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: props.location.state.nickname
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  update = () => {
    if (this.state.nickname == '') {
      Toast.info('请输入昵称', 1)
      return;
    }

    if (this.state.nickname.length < 4) {
      Toast.info('请输入4个字符以上', 1)
      return;
    }
    memberApi.updateMemberInfo({
      nichen: this.state.nickname
    }).then(result => {
      if (result.result == 1) {
        this.props.router.replace('/account')
      } else {
        Toast.info(result.msg, 1);
      }
    })
  }

  render() {
    const { nickname } = this.state;

    return (
      <WingBlank>
        <InputItem
          value={nickname}
          onChange={(val) => {
            this.setState({
              nickname:val
            })
          }}
          maxLength={20}
            clear
            placeholder="请输入昵称"
            autoFocus
        ></InputItem>
        <p>4-20字符，可由中英文、数字、“-”、“_”组成</p>
        <Button onClick={this.update} type='primary'>修改</Button>
      </WingBlank>
    );
  }
}

export default withRouter(UpdateNickName);
