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
class CircleSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      circleList: []
    }
  }

  componentDidMount() {
    Toast.loading();
    circleApi.circleSearch({
      pageNo: 1,
      pageSize: 50,
      searchType: 'keywordSearch',
      keyword: this.props.params.keyword
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data;
      this.setState({
        circleList: data
      });
    });
  }

  gotoCircleDetail = (circle) => {
    this.props.router.push('/circleDetail/' + circle.circleId)
  }

  render() {
    const { circleList } = this.state;
    return (
      <div>
        <List>
          {
            circleList.map(circle => {
              return <Item key={circle.circleId} onClick={()=>this.gotoCircleDetail(circle)}>
                <Flex>
                  <div>
                    <Img src={circle.circlePhoto} style={{
                      width: '1.5rem',
                      height: '1.5rem', borderRadius: '.75rem'
                    }} />
                  </div>
                  <Flex.Item>
                    <p dangerouslySetInnerHTML={{ __html: circle.circleName }}></p>
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

export default withRouter(CircleSearch);
