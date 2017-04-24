import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex
} from 'antd-mobile';
import * as memberApi from '../api/member';

class MyIntegral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopPointsLogsList: [],
      pointsNum: 0
    }
  }

  componentWillMount() {
    memberApi.shopPointsLogList({
      pageNo: 1,
      pageSize: 50
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          ...result.data
        })
      }
    })
  }

  render() {
    const {
      pointsNum,
      shopPointsLogsList
    } = this.state;
    return (
      <div className='fix-scroll hastitle'>
        <div style={{
          height: '1.3rem',
          padding: '0.5rem 0.3rem',
          textAlign: 'center',
          backgroundColor:'red',
          color:'#fff'
        }}>
          <p style={{
            fontSize:'.45rem',
            marginTop:'0'
          }}>{pointsNum}分</p>
          <p style={{
            marginTop:'-.30rem'
          }}>积分有多大用，多领一些存起来</p>
       </div>
       <WingBlank> 
        {
          shopPointsLogsList.map(pointsLog => {
            return <Flex key={pointsLog.id} justify='between' style={{
              borderBottom:'1px solid #999'
            }}>
              <div>
                <p>{pointsLog.stage}</p>
                <p>{pointsLog.createTimeStr}</p>
              </div>
              <div style={{color:'red'}}>
                {pointsLog.points}
              </div>
            </Flex>
          })
        }
        </WingBlank>  
      </div>
    )
  }
}

export default withRouter(MyIntegral);
