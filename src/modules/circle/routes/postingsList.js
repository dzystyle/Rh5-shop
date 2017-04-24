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
class PostingsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postingsList: [],
    }
  }

  componentDidMount() {
    Toast.loading();
    circleApi.postingSearch({
      searchType: null,
      pageNo: null,
      keyword: null,
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data;
      this.setState({
        postingsList: data
      });
    });
  }

  gotoPostingsDetail = (postings) => {
    this.props.router.push('/postings/' + postings.postingsId)
  }

  search = (val) => {
    this.props.router.push('/postingsSearch/' + val)
  }

  back = () => {
    this.props.router.goBack();
  }

  render() {
    const { postingsList } = this.state;
    return (
      <div>
        <Flex className='fixed-top'>
          <Icon type='left' onClick={this.back}/>
          <Flex.Item>
            <SearchBar
              onSubmit={value => this.search(value)}
              placeholder="请搜索你想要的帖子"></SearchBar>
          </Flex.Item> 
        </Flex>
        <List className='fix-scroll hastitle'>
          {
            postingsList.map(postings => {
              return <Item key={postings.postingsId} onClick={()=>this.gotoPostingsDetail(postings)}>
                <Flex>
                  <div>
                    <Img src={postings.memberImg} style={{width:'1.5rem',height:'1.5rem',borderRadius: '.75rem'}}/>
                  </div>
                  <Flex.Item>
                    <p>{postings.postingsName }</p>
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

export default withRouter(PostingsList);
