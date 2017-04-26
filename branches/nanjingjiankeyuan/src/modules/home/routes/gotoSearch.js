import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  SearchBar,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Icon,
  Button
} from 'antd-mobile';

class GoodsGotoSearch extends Component {
  constructor(props) {
    super(props);
    this.state={
    	value:''
    }
  }
	onSubmit=(value)=>{
		console.log(value)
		this.props.router.push(`/search/keywordSearch/${value}`)
	}
	 onChange= (value) => {
	    this.setState({ 
	    	value:value
	    });
	  };
  render() {
    return (
      <div>
        <Flex style={{background:'#efeff4',zIndex:'10000'}}>
          <Icon type='left' onClick={()=>this.props.router.goBack()}/>
          <Flex.Item>
            <SearchBar
            	placeholder="请输入商品名称"
              autoFocus
              onSubmit={value => {
              this.props.router.push(`/search/keywordSearch/${value}`)
            }}
              onChange={this.onChange}
            />
          </Flex.Item>  
          <button onClick={()=>this.onSubmit(this.state.value)} style={{padding:'0.26rem',background:'#efeff4',border:'0'}}>搜索</button>
        </Flex>
        
        {/*<WingBlank>历史搜索</WingBlank>*/}
      </div>
    )
  }
}

export default withRouter(GoodsGotoSearch);
