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
class PostingsSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postingsList: [],
    }
  }

  componentDidMount() {
    Toast.loading();
    circleApi.postingSearch({
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
        postingsList: data
      });
    });
  }

  gotoPostingsDetail = (postings) => {
    this.props.router.push('/postings/' + postings.postingsId)
  }

  render() {
    const { postingsList } = this.state;
    return (
      <div className='fix-scroll hastitle'>
        <List>
          {
            postingsList.map(postings => {
              return <Item key={postings.postingsId} onClick={()=>this.gotoPostingsDetail(postings)}>
                <Flex>
                  <div>
                    <Img src={postings.memberImg} style={{
                      width: '1.5rem',
                      height: '1.5rem', borderRadius: '.75rem'
                    }} />
                  </div>
                  <Flex.Item>
                    <p dangerouslySetInnerHTML={{ __html: postings.postingsName }}></p>
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

export default withRouter(PostingsSearch);
