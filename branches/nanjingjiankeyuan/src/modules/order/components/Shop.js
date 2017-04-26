import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, ActionSheet } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  gotoGoodsDetail = (item) => {
    common.gotoGoodsDetail({
      specId: item.specId
    });
  }

  showShipSelect = () => {
    const { data } = this.props;
    let showShip = null;
    if (!data || !data.shipPrice) {
      return;
    }

    let keys = Object.keys(data.shipPrice);
    const BUTTONS = Object.keys(data.shipPrice).map((key, index) => {
      if (key == 'kd') {
        return '快递'
      } else if (key == 'py') {
        return '平邮'
      } else {
        return '其他'
      }
    })
    BUTTONS.push('取消')
    
    console.log(keys);

    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        maskClosable: true,
      },
      (buttonIndex) => {
        console.log(buttonIndex);
        if (buttonIndex == BUTTONS.length - 1) {
          return;
        }
        this.props.updateShip({
          storeId: data.storeId,
          shipType: keys[buttonIndex]
        })
      });
  }

  render() {
    const { data } = this.props;
    console.log(data);
    let showShip = null;
    if (data && data.shipPrice) {
      const shipPrice = data.shipPrice;
      const selectedShip = data.selectedShip;
      if (shipPrice && Object.keys(shipPrice).length > 0) {
        if (selectedShip == 'kd') {
          showShip = '快递:' + shipPrice[selectedShip]
        } else if (selectedShip == 'py') {
          showShip = '平邮:' + shipPrice[selectedShip]
        } else {
          // showShip = '';
        }
      } else {
        showShip = '免运费'
      }
    }

    return <List className='wx-order-shop' renderHeader={() => data.storeName}> 
      {
        data.list.map((item,index) => {
          const showShip = null
          return <div key={index}><Item
            onClick={()=>this.gotoGoodsDetail(item)}  
            arrow="horizontal"
            multipleLine>
            <Flex>
              <Img src={item.goodsImages} style={{height:'200px',width:'200px'}}/>
              <div>
                <Brief style={{paddingLeft:'20px'}}>数量: {item.goodsNum}</Brief>
                <br/>
                <Brief style={{color:'red',paddingLeft:'20px'}}>¥{item.goodsPrice}</Brief>
              </div>  
            </Flex>
          </Item>
          </div>  
        })
      }
      <Item onClick={this.showShipSelect} extra={showShip}>&nbsp;</Item>
    </List>
  }
}

export default Shop;
