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

class Confirm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.params)
 	}
	sure=()=>{
		function getQueryString(name) {  
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
		    console.log(reg)
		    var r = window.location.search.substr(1).match(reg);  
		    console.log(r)
		    if (r != null) return unescape(r[2]); return null;  
		  }  
			var code = getQueryString("code");  
			console.log(code)
			console.log(this.props.params)
//			let code = wx.getStorageSync('codeinfo').code
			orderApi.towxpayInfo({
				orderCode:this.props.params.orderCode,
				code:code
			}).then(r => {
					console.log(r)
	       if (r.result == 1) {
	         Toast.info(r.msg);	         
	         WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":r.appid,     //公众号名称，由商户传入     
			           "timeStamp":r.timestamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":r.noncestr, //随机串     
			           "package":r.packageValue,     
			           "signType":"MD5",         //微信签名方式：     
			           "paySign":r.sign //微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
			       }
			   ); 
	       } else {
	         Toast.info(r.msg);
	       }
	     })
	}
	cancel=()=>{
		this.props.router.goBack()
	}
  render() {
    return <div>
      <div style={{height:'2rem',lineHeight:'2rem',textAlign:'center',fontSize:'0.5rem'}}>确定支付?</div>
      <Button onClick={()=>this.sure()}>确定</Button>
      <Button onClick={()=>this.cancel()}>取消</Button>
    </div>
  }
}

export default withRouter(Confirm);
