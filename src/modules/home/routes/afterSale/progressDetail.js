import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  List,
  Button,
  Steps
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../api/order';
const Step = Steps.Step;
const Item = List.Item;
import './progress.less';

class ProgressDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progressDetail: null
    }
  }

  componentDidMount() {
    const refundId = this.props.params.refundId;
    const type = this.props.params.type;
    if (type == 0) {
      orderApi.returnDetail({
        refundId
      }).then(result => {
        if (result.result == 1) {
          this.setState({
            progressDetail: result.data[0]
          })
        }
      })
    } else {
      orderApi.barterDetail({
        barterId: refundId
      }).then(result => {
        if (result.result == 1) {
          this.setState({
            progressDetail: result.data[0]
          })
        }
      })
    }

  }

  render() {
    const { progressDetail } = this.state
    if (!progressDetail) {
      return null;
    }
    const type = this.props.params.type;

    const list = type == 0 ? progressDetail.returnLogList : progressDetail.shopBarterLogList;
    return (
      <div className="wx-progress-detail fix-scroll">
        <List>
          <Item>问题描述</Item>
          <Item style={{height:'2rem'}}>
            <div style={{color:'red',width:'100%',whiteSpace:'normal'}}>{progressDetail.buyerMessage}</div>
          </Item>
          <Item>审核留言</Item>
          <Item style={{height:'2rem'}}>
            <div style={{color:'red',width:'100%',whiteSpace:'normal'}}>{progressDetail.sellerMessage}</div>
          </Item>
          <Item>审核进度</Item>
          <Item>
            <Steps current={list.length} size='small'>
              {
                list.map((log,index) => {
                	console.log(log)
                  return <Step key={index} title={log.createTimeStr}
                    description={log.stateInfo} 
                     />
                })
              }
            </Steps>
          </Item>
        </List> 
      </div>
    )
  }
}

export default withRouter(ProgressDetail);
