import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as addressApi from '../api/address';
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

  onSelectAddress = (address) => {
    this.props.dispatch({
      type: 'selectAddress',
      payload: address
    });
    this.props.router.replace(`/order/${this.props.order.cartId}`)
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
    return <div className='wx-addresslist'>
      <div className='fix-scroll hastitle hasbottom'>
      {
        addressList.map(address => {
          return <List key={address.addressId}>
            <Item multipleLine onClick={()=>this.onSelectAddress(address)}>
              {address.trueName} &nbsp;&nbsp; {address.mobPhone}  <Brief>{address.areaInfo} {address.address}</Brief>
            </Item>
            <Item>
              <Flex>
                <Flex.Item>
                  <AgreeItem checked={address.isDefault==1} onChange={() => this.setDefault(address)}>
                    设置默认
                  </AgreeItem>
                </Flex.Item>
                <Flex.Item style={{textAlign:'right'}}>
                  <Button type='primary' size='small' onClick={()=>this.gotoEdit(address)} inline>编辑</Button>&nbsp;
                  <Button type='primary' size='small' onClick={()=>this.gotoDel(address)} inline>删除</Button>
                </Flex.Item>
              </Flex>
            </Item>
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

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(Address));
