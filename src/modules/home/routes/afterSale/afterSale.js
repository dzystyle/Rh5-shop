import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import AfterSaleOrderItem from '../../components/AfterSaleOrderItem';
import * as orderApi from '../../api/order';
import './afterSale.less';

class AfterSale extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.orderList = []
    this.state = {
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.orderList),
      hasMore: true,
      isLoading: true,
      isInit1: true,
      arr:[]
    }
  }

  refreshList = ({ pageNo }) => {
    orderApi.orderlist({
      pageNo,
      orderType: 2,
      status: '20,30,40'
    }).then(result => {
      this.setState({
        isLoading: false
      });
      if (result.result == 1) {
        const data = result.data || [];
        const pageSize = 10;
        const dataLength = data.length;
        if (dataLength < pageSize) {
          this.setState({
		        hasMore: false
		      });
        }
        if (this.state.isInit1) {
          this.orderList = data;
          this.setState({
          	arr:data
          })
        } else {
        	this.orderList =this.state.arr.concat(data)
//        this.orderList = { ...this.state.arr, ...data };
        }
        this.setState({
          pageNo,
          dataSource: this.ds.cloneWithRows(this.orderList)
        })
      }
    })
  }

  componentDidMount() {
    this.refreshList({
      pageNo: 1
    });
  }

  onEndReached = (event) => {
    if (!this.state.isLoading && !this.state.hasMore) {
      return;
    }
	  this.setState({ 
	  	isLoading: true,
	  	isInit1:false
	  });
    let pageNo = this.state.pageNo + 1;
    // orderApi.orderlist({
    //   pageNo,
    //   orderType: this.state.orderType,
    //   status: this.state.status
    // }).then(result => {
    //   if (result.result == 1) {
    //     const data = result.data || [];
    //     const pageSize = 10;
    //     const dataLength = data.length;
    //     let hasMore = true;
    //     if (dataLength < pageSize) {
    //       hasMore = false;
    //     }
    //     this.orderList = [...this.orderList, ...data];
    //     this.setState({
    //       hasMore,
    //       isLoading: false,
    //       pageNo,
    //       dataSource: this.ds.cloneWithRows(this.orderList),
    //     })
    //   }
    // })
//  setTimeout(() => {
	if(!this.state.isInit1){
		this.refreshList({
        pageNo,
        status: this.state.status,
        orderType: this.state.orderType,
      });
	}
      
//  }, 1000);
  }

  render() {
    const { dataSource } = this.state
    const footer = <div style={{ padding: 30, textAlign: 'center' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;
    return (
      <div className="wx-afterSale">
        <div className="fix-scroll hastitle hasbottom">
          <ListView
            style={{
              height: '100%'
            }}
            dataSource={this.state.dataSource}
            renderFooter={()=>footer}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={100}
            renderRow={(dataItem) => (
              <AfterSaleOrderItem
                cancelOrder={() => this.refreshList({
                  pageNo:1
                })}
                dataItem={dataItem}></AfterSaleOrderItem>
            )}>
          </ListView>
        </div>
        <Button className='progressquery'
          onClick={() => {
            this.props.router.push('/progress')
          }}  
          type='primary'>进度查询</Button>
      </div>
    )
  }
}

export default withRouter(AfterSale);
