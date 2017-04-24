import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'

import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { common } from 'common';
import * as loginApi from '../api/login';

import './login.less';

const Item = List.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    // 获取URL参数
    if (this.props.location.query) {
      if (this.props.location.query.callBack) {
        this.callBack = this.props.location.query.callBack;
      }
    }
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, value) => {
      if (!error) {
        loginApi.login(this.props.form.getFieldsValue()).then(result => {
          if (result.result == 1) {
            Toast.success('登录成功');
            // 登录成功保存 token
            localStorage.setItem('token', result.data[0].token);
            window.location.href = this.callBack || 'home.html';
          } else {
            Toast.fail(result.msg, 1);
          }
        })
      }
    });
  }
  validateusername = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('用户名至少4个字符'));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <List
        renderFooter={() => getFieldError('username') && getFieldError('username').join(',')}
      >
        <InputItem
          {...getFieldProps('username', {
            rules: [
              { required: true, message: '请输入用户名／邮箱／已验证邮箱' },
              { validator: this.validateusername },
            ],
          })}
          clear
          placeholder="请输入账号"
        >帐号</InputItem>
        <InputItem {...getFieldProps('password')} placeholder="请输入密码" type="password">
          密码
        </InputItem>
        <Item>
          <Button type="primary" onClick={this.onSubmit} >登录</Button>
        </Item>
        <Item extra={<Link to='/forgetPassword' style={{color:'#777'}}>忘记密码?</Link>}><Link to='/reg' style={{color:'#777'}}>注册账号</Link></Item>
      </List>
    </form>);
  }
}

export default createForm()(Login);
