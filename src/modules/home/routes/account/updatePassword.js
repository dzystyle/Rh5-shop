import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button,
  InputItem,
  List,
  Toast
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as memberApi from '../../api/member';

class UpdatePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  update = () => {
    const getFieldsValue = this.props.form.getFieldsValue();
    if (!getFieldsValue.password || getFieldsValue.password == '') {
      Toast.info('请输入密码！');
      return;
    }
    if (!getFieldsValue.newpassword || getFieldsValue.newpassword == '') {
      Toast.info('请输入新密码！');
      return;
    }
    if (!getFieldsValue.newpassword1 || getFieldsValue.newpassword1 == '') {
      Toast.info('请确认新密码！');
      return;
    }

    if (getFieldsValue.newpassword != getFieldsValue.newpassword1) {
      Toast.info('两次输入的密码不一致！');
      return;
    }

    memberApi.updatePassword({
      newpassword: getFieldsValue.newpassword,
      password: getFieldsValue.password
    }).then(result => {
      // 修改密码处理
      if (result.result == 0) {
        Toast.fail(result.msg);
        return;
      }

      // 修改成功提示
      Toast.success(result.msg);
      // 跳转到登录
      common.gotoLogin();
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <List>
        <InputItem
          {...getFieldProps('password')}  
            clear
            placeholder="请输入原密码"
            autoFocus
          type='password'
        >旧密码</InputItem>
        <InputItem
           {...getFieldProps('newpassword')}  
            clear
            placeholder="请输入新密码"
            type='password'
        >新密码</InputItem>
        <InputItem
            {...getFieldProps('newpassword1')}  
            clear
             type='password'
            placeholder="请输入确认密码"
        >确认密码</InputItem>

        <Button onClick={this.update} type='primary'>修改</Button>
      </List>
    );
  }
}

export default withRouter(createForm()(UpdatePassword));
