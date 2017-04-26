import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
    WhiteSpace
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as addressApi from '../../api/address';
import { common } from 'common';
import { createForm } from 'rc-form';

import './address.less';

const Item = List.Item;
const Brief = Item.Brief;
const AgreeItem = Checkbox.AgreeItem;

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: []
    }
  }

  initAddressList = () => {
    addressApi.addressList().then(result => {
      if (result.result == 1) {
        this.setState({
          addressList: result.data
        })
      }
    })
  }

  componentDidMount() {
    this.initAddressList();
  }

  gotoAdd = () => {
    this.props.router.push('/addressAdd')
  }

  gotoEdit = (address) => {
    this.props.router.push({
      pathname: '/addressEdit',
      state: address
    });
  }

  gotoDel = (address) => {
    Modal.alert('删除', '确定删除地址么???', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          addressApi.delAddress(address.addressId).then(result => {
            if (result.result == 1) {
              this.setState({})
            }
            Toast.info(result.msg);
            this.initAddressList();
          })
        },
        style: { fontWeight: 'bold' }
      },
    ])
  }

  setDefault = (address) => {
    addressApi.updateAddressDef(address.addressId).then(result => {
      if (result.result == 1) {
        this.initAddressList();
      }
    })
  }

  render() {
    const { addressList } = this.state;
    return <div className='wx-addresslist fix-scroll hastitle'>
      <div className="d-adrsm" style={{marginBottom:'0.84rem'}}>
          {
              addressList.map(address => {
                  return <List key={address.addressId}>
                    <Item multipleLine>
                        {address.trueName} &nbsp;&nbsp;
          <div className="d-adrsd">
              <Flex.Item>
              <AgreeItem checked={address.isDefault==1} onChange={() => this.setDefault(address)}>
            默认
            </AgreeItem>
            </Flex.Item>
            </div> {address.mobPhone}



            <Brief>{address.areaInfo} {address.address}</Brief>

                    </Item>
                    <Item>
                      <Flex>

                        <Flex.Item style={{textAlign:'right'}}>
                          <div className="d-adrsbtnd" type='primary' size='small' onClick={()=>this.gotoDel(address)} inline><div style={{ backgroundImage: 'url(./assets/img/shanchu.png)', backgroundSize: 'cover', height: '0.24rem', width: '0.19rem',float:'left',marginTop:'0.1rem',marginLeft:'0.1rem' }} /><div className="d-adrsbtnt">删除</div></div>
                          <div className="d-adrsbtnb" type='primary' size='small' onClick={()=>this.gotoEdit(address)} inline><div style={{ backgroundImage: 'url(./assets/img/bianji.png)', backgroundSize: 'cover', height: '0.24rem', width: '0.24rem',float:'left',marginTop:'0.1rem',marginLeft:'0.1rem' }} /><div className="d-adrsbtnt">编辑</div></div>
                        </Flex.Item>
                      </Flex>
                    </Item>
                    <WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>
                  </List>
              })
          }
      </div>

      <div className='wx-addresslist-bar'>
        <Button type='primary' onClick={this.gotoAdd}>新增地址</Button>
      </div>
    </div>
  }
}

export default withRouter(Address);
