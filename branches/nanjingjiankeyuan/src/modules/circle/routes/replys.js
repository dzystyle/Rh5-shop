import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  List,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class Replys extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentsList: []
    }
  }

  refresh = () => {
    Toast.loading();
    circleApi.findReplysList({
      commentId: this.props.params.commentId,
      pageNo: 1,
      pageSize: 50
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      let data = result.data;
      this.setState({
        commentsList: data
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    const {
      commentsList
    } = this.state;
    return (
      <div className='fix-scroll hastitle'>
        <List>
          {
            commentsList==undefined?'':commentsList.map(comments => {
              return <Item key={comments.commentId}>
                <Flex>
                  <Img src={comments.memberAvatar} style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '.5rem'
                  }} />
                  <Flex.Item>
                    <Flex justify='between' align='top'>
                      <div>
                        <p>{comments.memberTruename}</p>
                        <p>{comments.comments}</p>
                      </div>
                      <p>{comments.createTimeStr}</p>
                    </Flex>
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

export default withRouter(Replys);
