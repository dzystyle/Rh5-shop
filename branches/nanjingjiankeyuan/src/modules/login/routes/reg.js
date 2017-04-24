import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as api from '../api/login';
import './reg.less';

const Item = List.Item;

class Reg extends Component {
  timout = null
  code = null
  state = {
    countDown: 60,
    showCountDown: false
  }

  onSubmit = () => {
    const getFieldsValue = this.props.form.getFieldsValue();
    if (!getFieldsValue.mobile || getFieldsValue.mobile == '') {
      Toast.info('请输入手机号！');
      return;
    }
    if (!getFieldsValue.code || getFieldsValue.code == '') {
      Toast.info('请输入验证码！');
      return;
    }
    if (!getFieldsValue.password || getFieldsValue.password == '') {
      Toast.info('请输入密码！');
      return;
    }
    if (!getFieldsValue.password2 || getFieldsValue.password2 == '') {
      Toast.info('请确认密码！');
      return;
    }

    if (getFieldsValue.password != getFieldsValue.password2) {
      Toast.info('两次输入的密码不一致！');
      return;
    }

    if (!this.code || (this.code && this.code != getFieldsValue.code)) {
      Toast.info('验证码不正确！');
      return;
    }
    api.register({
      mobile: getFieldsValue.mobile,
      name: getFieldsValue.mobile,
      password: getFieldsValue.password
    }).then(result => {
      // 注册处理
      if (result.result == 0) {
        Toast.fail(result.msg);
        return;
      }

      // 注册成功提示
      Toast.success(result.msg);
      // 跳转到登录
      common.gotoLogin();
    });
  }

  countDown = () => {
    const self = this;
    this.timout = setTimeout(function() {
      if (self.state.countDown > 0) {
        self.setState({ countDown: self.state.countDown - 1 });
        self.countDown();
      } else {
        self.setState({
          showCountDown: false
        });
      }
    }, 1000, 0);
  }

  getCode = () => {
    if (this.state.showCountDown) {
      return;
    }
    const getFieldsValue = this.props.form.getFieldsValue();
    console.log(getFieldsValue);
    if (!getFieldsValue.mobile || getFieldsValue.mobile == '') {
      Toast.info('请先输入手机号！');
      return;
    }
    api.verifyCode({ mobile: getFieldsValue.mobile }).then(result => {
      if (result.result == 0) {
        Toast.fail(result.msg);
        return;
      }
      this.code = result.data.verifyCode
      this.setState({
        showCountDown: true,
        countDown: 60
      })
      this.countDown();
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (<form className='wx-reg'>
      <List>
        <InputItem
          {...getFieldProps('mobile') }
          clear
          placeholder="请输入手机号"></InputItem>
        <InputItem
          {...getFieldProps('code') }
          clear
          onExtraClick={this.getCode}
          placeholder="请输入验证码" extra={this.state.showCountDown?`${this.state.countDown}秒后重新获取`:'获取验证码'}></InputItem>
        <InputItem {...getFieldProps('password') } placeholder="请输入密码" type="password">
        </InputItem>
        <InputItem {...getFieldProps('password2') } placeholder="请确认密码" type="password">
        </InputItem>
        <Item>
          <Button type="primary" onClick={this.onSubmit}>注册</Button>
        </Item>
      </List>
    </form>);
  }
}

export default createForm()(Reg);
