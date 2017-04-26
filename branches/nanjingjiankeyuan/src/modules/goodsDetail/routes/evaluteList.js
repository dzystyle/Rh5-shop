import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  SegmentedControl
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import Moment from 'moment';
import * as goodsDetailApi from '../api/goodsDetail';
import './evaluteList.less'

const Item = List.Item;

class EvaluteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluteList: [],
      countAll: null,
      selectedIndex: 0
    }
  }

  componentDidMount() {
    this.onChange();
  }

  onChange = (index) => {
    let gevalScore = null;
    let gevalImg = 1;
    switch (index) {
      case 0:
        gevalScore = null;
        break;
      case 1:
        gevalScore = 5;
        break;
      case 2:
        gevalScore = 3;
        break;
      case 3:
        gevalScore = 1;
        break;
      case 4:
        gevalScore = '';
        gevalImg = 0;
        break;
      default:
        break;
    }

    this.setState({
      selectedIndex: index
    })

    goodsDetailApi.goodsEvaluteList({
      goodsId: this.props.params.goodsId,
      gevalScore,
      gevalImg
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        if (data && data.length > 0) {
          this.setState({
            evaluteList: data[0].beanList || [],
            countAll: data[0].countAll
          })
        }
      }
    })
  }

  render() {
    const { evaluteList, countAll, selectedIndex } = this.state;

    const tabs = [];
    if (countAll) {
      tabs.push(<div>全部评论<div>({countAll.all})</div></div>);
      tabs.push(<div>好评<div>({countAll.good})</div></div>);
      tabs.push(<div>中评<div>({countAll.general})</div></div>);
      tabs.push(<div>差评<div>({countAll.bad})</div></div>);
      tabs.push(<div>晒图<div>({countAll.ImgCount})</div></div>);
    }

    return (
      <div className="wx-EvaluteList">
        {
         countAll && <SegmentedControl tintColor='red' selectedIndex={selectedIndex}
            style={{
              textAlign: 'center',
              height: '1rem',
              position: 'fixed',
              top: '0.9rem',
              left: 0,
              width: '100%',
              zIndex:100
            }} values={tabs}
            onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)} >
          </SegmentedControl>
        }
        <div className='fix-scroll' style={{paddingTop:'1.9rem',backgroundColor:'white'}}>
        <List>
        {
            evaluteList && evaluteList.map((item, index) => {
            const gevalImageShow = item.gevalImage && item.gevalImage.split(',').map((image, i) => <Img key={i} src={image} style={{width:'1.5rem',height:'1.5rem'}}/>)
            return <WingBlank key={index}>
              <WhiteSpace></WhiteSpace>
              <Flex justify='between'>
                <div><Img src={item.gevalFrommemberAvatar} style={{ width: '.36rem',height:'.36rem'}}/><span>{item.gevalFrommembername}</span></div>
                <div>{Moment(item.gevalAddTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              </Flex>
              <WhiteSpace></WhiteSpace>
              <Flex>
                <Flex.Item>
                  {
                    [...Array(item.gevalScore)].map((_, i) => {
                      return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '.36rem',height:'.36rem'  }} />
                    })
                  }
                  {
                    [...Array(5-item.gevalScore)].map((_, i) => {
                      return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-off.png`} style={{ width: '.36rem',height:'.36rem' }} />
                    })
                  }
                </Flex.Item>
                
              </Flex>
              <WhiteSpace></WhiteSpace>
              <div>{item.gevalContent}</div>
              <WhiteSpace></WhiteSpace>
              {
                item.gevalImage && <div>{gevalImageShow}</div>
              }
              <p style={{
                fontSize: '.24rem',
                color:'gray'
              }} dangerouslySetInnerHTML={{ __html: item.specInfo }} ></p>
              <p style={{
                fontSize: '.24rem',
                color:'gray'
              }}>购买日期:{Moment(item.orderAddTime).format('YYYY-MM-DD HH:mm:ss')}</p>
            </WingBlank>
          })
        }  
        </List>  
        </div>
      </div>
    )
  }
}

export default withRouter(EvaluteList);
