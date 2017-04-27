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

    return  <List className='wx-order-shop'>
      <Item style={{ float:'left', }}>
     <Flex className="dshopicon" style={{backgroundImage: 'url(./assets/img/dianpu.png)', backgroundSize: 'cover',width:'0.3rem',height:'0.26rem'}}> </Flex>
  </Item>
    <Item className="newshopN">
      {
      data.storeName
      }
    </Item>
      {

        data.list.map((item,index) => {
          const showShip = null
          return <div key={index}>
          <Item
            onClick={()=>this.gotoGoodsDetail(item)}  
            arrow="horizontal"
            multipleLine>
            <Flex>
            <Img src={item.goodsImages} style={{height:'200px',width:'200px'}}/>
            <div className="dnitemif">
            <div className="fon26">玩具产品检测服务</div>
            <div className="fon24" >套餐一</div>
            <div className="fon24" >纸制造正副本 </div>
            </div>
              <div className="dnitempic">
                <Brief style={{ paddingLeft:'20px',float:'left'}}>{item.goodsNum}</Brief>

                <Brief style={{color:'red',paddingLeft:'20px'}}>¥{item.goodsPrice}</Brief>
                <div >
  <Brief style={{ paddingLeft:'20px',float:'left',height:'0.6rem'}}>{item.goodsNum}</Brief>

  <Brief style={{color:'red',paddingLeft:'20px',height:'0.7rem',lineHeight:'0.7rem'}}>¥{item.goodsPrice}</Brief>
                </div>
              </div>

  </Flex>
          </Item>
          </div>  
        })
      }

    </List>
  }
}

export default Shop;
