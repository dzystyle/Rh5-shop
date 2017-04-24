import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
  InputItem,
  Picker
} from 'antd-mobile';

import * as addressApi from '../../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const district = addressApi.getAreaData();

class AddressEdit extends Component {
  constructor(props) {
    super(props);
    this.state={
    	sty:false,
    	sty1:false
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      ...this.props.location.state,
      areaIds: [
        this.props.location.state.provinceId,
        this.props.location.state.cityId,
        this.props.location.state.areaId
      ]
    });
  }

  onSubmit = () => {
    // 提交地址
    const fieldsValue = this.props.form.getFieldsValue()
    // check
    if (!fieldsValue.trueName || fieldsValue.trueName == '') {
      Toast.info('收货人姓名不能为空');
      return;
    }
    if (!fieldsValue.mobPhone || fieldsValue.mobPhone.trim() == '') {
      Toast.info('手机号不能为空');
      return;
    }
    if (fieldsValue.mobPhone.length!=13||fieldsValue.mobPhone[0]==0) {
      Toast.info('手机号格式不正确');
      return;
    }
    if (!fieldsValue.zipCode || fieldsValue.zipCode == '') {
      Toast.info('邮政编码不能为空');
    }
     if (fieldsValue.zipCode.length!=6||fieldsValue.zipCode[0]==0) {
      Toast.info('邮政编码格式不正确');
      return;
    }
    if (!fieldsValue.areaIds || fieldsValue.areaIds.length == 0) {
      Toast.info('请选择所在地区');
      return;
    }
    if (!fieldsValue.address || fieldsValue.address == '') {
      Toast.info('详细地址不能为空');
      return;
    }
		if (fieldsValue.telPhone.length!=7||fieldsValue.telPhone.length!=8) {
      Toast.info('座机电话格式不正确');
      return;
    }
    const provinceId = fieldsValue.areaIds[0];
    const cityId = fieldsValue.areaIds[1];
    const areaId = fieldsValue.areaIds[2];

    const currentProvince = (district.filter(item => item.value == provinceId))[0]
    const currentCity = (currentProvince.children.filter(item => item.value == cityId))[0]
    const currentArea = (currentCity.children.filter(item => item.value == areaId))[0]
    const currentAreaName = [currentProvince.label, currentCity.label, currentArea.label].join(',');

    addressApi.saveAddress({
      addressId: this.props.location.state.addressId,
      ...fieldsValue,
      provinceId,
      cityId,
      areaId,
      areaInfo: currentAreaName
    }).then(result => {
      if (result.result == 1) {
        this.props.router.push('/address')
      } else {
        Toast.info(result.msg);
      }
    })

  }
	onBlur=()=>{
		this.setState({
      sty:false
    })
	}
	onFocus=()=>{
		this.setState({
      sty:true
    })
	}
	onBlur1=()=>{
		this.setState({
      sty1:false
    })
	}
	onFocus1=()=>{
		this.setState({
      sty1:true
    })
	}

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    // const {
    //   provinceId,
    //   cityId,
    //   areaId
    // } = this.props.location.state;

    // const areaIds = [provinceId, cityId, areaId]



    // componentDidMount() {
    //   this.props.form.setFieldsValue({
    //     ...this.props.location.state,
    //     areaIds: [
    //       this.props.location.state.provinceId,
    //       this.props.location.state.cityId,
    //       this.props.location.state.areaId
    //     ]
    //   });
    // }

    // const { getFieldProps } = this.props.form;
    return <div className='wx-address-add'>
      <List className="picker-list">
         <InputItem
            {...getFieldProps('trueName')}
            clear
            placeholder="请输入收货人"
          >收货人</InputItem>
        <InputItem
            {...getFieldProps('mobPhone')}
            clear
            type='phone'
            placeholder="请输入手机号"
        >手机号</InputItem>
        <InputItem
            {...getFieldProps('zipCode')}
            clear
            type='number'
            placeholder="请输入邮政编码">邮政编码</InputItem>
        <Picker   
          data={district}
          title="选择地区"
          {...getFieldProps('areaIds')}
        >
          <List.Item arrow="horizontal">所在地区</List.Item>
        </Picker>
        <InputItem style={this.state.sty1==true?{position:'absolute',top:'10%',borderRadius:'30px',zIndex:'99999',width:'91%',padding:'0.2rem 0.3rem',border:'1px solid #000',borderBottom:'2px solid #000',background:'rgb(235, 235, 239)'}:{}}
            {...getFieldProps('address')}
            clear
            onFocus={this.onFocus1}
						onBlur={this.onBlur1}
            placeholder="详细地址">详细地址</InputItem>
        <InputItem style={this.state.sty==true?{position:'absolute',top:'15%',borderRadius:'30px',zIndex:'99999',width:'91%',padding:'0.2rem 0.3rem',border:'1px solid #000',borderBottom:'2px solid #000',background:'rgb(235, 235, 239)'}:{}}
            {...getFieldProps('telPhone')}
            clear
            onFocus={this.onFocus}
						onBlur={this.onBlur}
            type='number'
            placeholder="座机电话">座机电话</InputItem>
        <Item>
          <Button onClick={this.onSubmit} type='primary'>保存</Button>
        </Item>
      </List>
    </div>
  }
}

export default withRouter(
  createForm()(AddressEdit)
);
