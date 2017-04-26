import React, { ReactDOM, Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  ActionSheet,
  Modal,
  DatePicker
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Img } from 'commonComponent';
import { common } from 'common';
import moment from 'moment';
import * as memberApi from '../../api/member';

import './account.less';

const Item = List.Item;
const sexs = {
  '1': '男',
  '2': '女',
  '3': '默认',
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetail: null
    }
  }

  getMember = () => {
    memberApi.memberDetail().then(result => {
      let data = result.data;
      if (data) {
        this.setState({
          memberDetail: data[0]
        });
      }
    })
  }

  componentDidMount() {
    this.getMember();
  }

  gotoLogin = () => {
    common.gotoLogin();
  }

  logout = () => {
    Modal.alert('系统提示', '您确定要退出登录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          common.removeToken();
          this.props.router.push('/my');
        }
      },
    ]);
  }

  gotoAddress = () => {
    this.props.router.push('/address')
  }

  changeIcon = () => {
    this.showActionSheet();
  }

  onChangeBirthday = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    memberApi.updateMemberInfo({
      birthday: dateStr
    }).then(r => {
      Toast.info(r.msg, 1)
      this.getMember();
    })
  }

  showSexSheet = () => {
    const BUTTONS = ['男', '女', '默认', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
      },
      (buttonIndex) => {
        if (buttonIndex == 3) {
          return;
        }
        memberApi.updateMemberInfo({
          sex: buttonIndex + 1
        }).then(result => {
          Toast.info(result.msg, 1)
          this.getMember();
        })
      });
  }

  showActionSheet = () => {
    const BUTTONS = ['上传头像', '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          console.log(this.refs.head);
          this.refs.head.click();
        }
      });
  }

  changeFile = (e) => {

    const files = this.refs.head.files[0];
    memberApi.filesUpload({
      images: files
    }).then(result => {
      if (result.result == 1) {
        const imgUrl = result.data;
        memberApi.updateMemberInfo({
          imgUrl
        }).then(r => {
          Toast.info(r.msg, 1)
          this.getMember();
        })
      }
    });
  }

  render() {
    const { memberDetail } = this.state;
    if (!memberDetail) {
      return null;
    }

    const userIcon = <Img onClick={() => {
        this.props.router.push('/account')
        }}
        style={{ width: '1rem', height: '1rem' }} src={memberDetail.memberAvatar}></Img>

    const memberBirthday = memberDetail.memberBirthdaystr && moment(memberDetail.memberBirthdaystr).utcOffset(8);
    const { getFieldProps } = this.props.form;

    const maxDate = moment().utcOffset(8);
    return <div className="wx-account">
      <List>
        <Item arrow="horizontal" extra={userIcon} onClick={this.changeIcon}>头像</Item>
        <Item arrow="horizontal"
          onClick={() => {
            this.props.router.push({
              pathname: '/updateNickName',
              state: {
                nickname:memberDetail.memberTruename
              }
            })
          }}
          extra={memberDetail.memberTruename}>昵称</Item>
        <Item style={{paddingRight:'10px'}} extra={memberDetail.memberName}>用户名</Item>
        <Item arrow="horizontal" onClick={this.showSexSheet} extra={sexs[memberDetail.memberSex]}>性别</Item>
        <DatePicker
          mode="date"
          title="选择日期"
          {...getFieldProps('memberBirthday', {
            initialValue: memberBirthday
          }) }
          onChange={(date)=>this.onChangeBirthday(date)}
          maxDate={maxDate}>
          <Item arrow="horizontal">出生日期</Item>
        </DatePicker>
        <Item arrow="horizontal" onClick={() => {
          this.gotoAddress()
        }}>地址管理</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/accountSafe')}>账户安全</Item>
        <Item arrow="horizontal" onClick={()=>this.props.router.push('/recharge')}>余额充值</Item>
      </List>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Button type='primary' onClick={this.logout}>退出登录</Button>
      </WingBlank>
      <input type="file" ref="head" name="image" style={{ display: 'none' }}
        accept="image/*" onChange={(e) => this.changeFile(e)} />
    </div>
  }
}

export default withRouter(createForm()(Account));
