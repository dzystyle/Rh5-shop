import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
  Modal
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';

const Item = List.Item;
const prompt = Modal.prompt;

class Cashier extends Component {
  constructor(props) {
    super(props);
  }

  gotoPay = (type) => {

    if (type == 1) {
//    Modal.alert('微信支付..开发中');
//  //调登陆接口
//  wx.login({
//    success: function (res) {
//    	alert(res)
//      if (res.code) {
//        //存储 code
//        var codeinfo = {
//          code: res.code,
//        };
//        wx.setStorageSync('codeinfo', codeinfo)
//      }
//    },
//    fail: function () {
//      console.log("授权失败");
//    },
//    complete: function () {
//
//    }
//  })
//    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/'+this.props.params.orderCode+'/'+this.props.params.totalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'			
			this.props.router.push(`/payConfirm/${this.props.params.orderCode}/${this.props.params.totalPrice}`);
//			function getQueryString(name) {  
//		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
//		    console.log(reg)
//		    var r = window.location.search.substr(1).match(reg);  
//		    console.log(r)
//		    if (r != null) return unescape(r[2]); return null;  
//		  }  
//			var code = getQueryString("code");  
//			console.log(code)
//			console.log(this.props.params)
////			let code = wx.getStorageSync('codeinfo').code
//			orderApi.towxpayInfo({
//				orderCode:this.props.params.orderCode,
//				code:code
//			}).then(r => {
//					console.log(r)
//	       if (r.result == 1) {
//	         Toast.info(r.msg);	         
//	         WeixinJSBridge.invoke(
//			       'getBrandWCPayRequest', {
//			           "appId":r.appid,     //公众号名称，由商户传入     
//			           "timeStamp":r.timestamp,         //时间戳，自1970年以来的秒数     
//			           "nonceStr":r.noncestr, //随机串     
//			           "package":r.packageValue,     
//			           "signType":"MD5",         //微信签名方式：     
//			           "paySign":r.sign //微信签名 
//			       },
//			       function(res){     
//			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
//			       }
//			   ); 
//	       } else {
//	         Toast.info(r.msg);
//	       }
//	     })
		}else if(type==2){
      orderApi.toAliH5pay({
				orderCode:this.props.params.orderCode
			}).then(r => {
					alert(r)
	       if (r.result == 1) {
	       		alert(1)
	       } else {
	         alert(r.msg);
	       }
	     })
    }else if(type==4){
    	console.log(this.props)
    	prompt(
        '请输入支付密码',
        '', [{ text: '取消' }, {
          text: '提交',
          onPress: passwd => {
            orderApi.chkPasswd({ passwd }).then(result => {
              if (result.result == 1) {
                // 密码正确，继续提交订单
                orderApi.saveorder({
						      cartIds: cartId,
						      addressId: selectedAddress.addressId,
						      paytype:1,
						      freight,
						      couponId,
						      invoiceId: invoice ? invoice.id : null,
						      isPd:1,
						      activityIds: null
						    }).then(result => {
						      if (result.result == 1) {						       
						          // 余额数大于 订单支付额
						          // console.log(priceData);
						          if (parseFloat(priceData.totalPrice) == 0) {
						            console.log('支付成功，跳转到成功页面');
						            this.props.router.replace('/paySuccess/' + result.data[0].paySn);
						          }
						       }
						    });
              } else {
                Toast.fail(result.msg);
              }
            })
          }
        }],
        'secure-text',
      )
    }
  }

  render() {
    const totalPrice = this.props.params.totalPrice;

      const IconClass = ({ url }) => {
          return <div style={{
              width: '0.45rem',
              height: '0.45rem',
              background: `url(${url}) center center /  0.45rem 0.45rem no-repeat`,
              display:'inline-block',
              marginRight:'0.1rem'
          }}
          />
      }

    const imgUrl = ['./assets/img/WechatIMG96.png',
      './assets/img/WechatIMG97.png',
      './assets/img/WechatIMG98.png',
      './assets/img/mine_order.png'
    ];
    let headerContent = '';
    // 充值订单
    if (this.props.params.orderCode.startsWith('R')) {
      headerContent = `充值金额为¥${totalPrice}!`
    } else {
      headerContent = `当前订单金额为¥${totalPrice}!`
    }
    return <List renderHeader={headerContent}>
      <Item thumb={<IconClass url={imgUrl[0]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(1)}>微信支付</Item>
      <Item thumb={<IconClass url={imgUrl[1]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(2)}>支付宝支付</Item>
      {/*<Item thumb={<IconClass url={imgUrl[2]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(3)}>银联支付</Item>*/}
      <Item thumb={<IconClass url={imgUrl[3]}></IconClass>} arrow='horizontal' onClick={()=>this.gotoPay(4)}>余额支付</Item>
    </List>
  }
}

export default withRouter(Cashier);
