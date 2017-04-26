import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  Modal,
  List,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  SearchBar,
  Button,
  Icon
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class CircleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotpostings: [],
      hotCircle: [],
      myCircle: []
    }
  }

  componentDidMount() {
    Toast.loading();
    circleApi.myCircle().then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data[0];
      this.setState({
        ...data
      });
    });
  }

  gotoCircleDetail = (circle) => {
    this.props.router.push('/circleDetail/' + circle.circleId)
  }

  search = (val) => {
    this.props.router.push('/circleSearch/' + val)
  }

  back = () => {
    this.props.router.goBack();
  }

  render() {
    const { hotCircle, hotpostings } = this.state;
    return (
      <div>
        <Flex className='fixed-top'>
          <Icon type='left' onClick={this.back}/>
          <Flex.Item>
            <SearchBar
              onSubmit={value => this.search(value)}
              placeholder="请搜索你想要的圈子"></SearchBar>
          </Flex.Item> 
        </Flex>
        <List className='fix-scroll hastitle'>
          {
            hotCircle.map(circle => {
              return <Item key={circle.circleId} onClick={()=>this.gotoCircleDetail(circle)}>
                <Flex>
                  <div>
                    <Img src={circle.circlePhoto} style={{width:'1.5rem',height:'1.5rem',borderRadius: '.75rem'}}/>
                  </div>
                  <Flex.Item>
                    <p>{circle.circleName}</p>
                    <div className='text-overflow-hidden'>{circle.circleDescription}</div>
                    <p><span>关注{circle.concerns}</span>  <span>评论{circle.postingsNum}</span></p>
                  </Flex.Item>
                </Flex>
              </Item>
            })
          }
          </List>
      </div>
    )
  }
}

export default withRouter(CircleList);
