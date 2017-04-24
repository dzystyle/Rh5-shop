import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List
} from 'antd-mobile';
import * as contentApi from '../api/content';
import { Img } from 'commonComponent';
import './content.less';
const Item = List.Item;

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: []
    }
  }

  componentDidMount() {
    contentApi.commentList({
      contentId: this.props.params.id
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          commentList: result.data
        })
      }
    })
  }

  render() {
    const {
      commentList
    } = this.state;
    return (
      <div className='fix-scroll hastitle'>
        <List>
          {
            commentList.map(comment => {
              return <Item key={comment.commentid}>
                <Flex align='top'>
                  <Img src={comment.memberAvatar} style={{
                    width: '1rem',
                    height: '1rem'
                  }} />
                  <Flex.Item>
                    <div>{comment.memberTruename}</div>
                    <p>{comment.comment}</p>
                  </Flex.Item>
                  <div>
                    {comment.createTimeStr}
                  </div>  
                </Flex>
              </Item>    
            })
          }
        </List>
      </div>
    )
  }
}

export default withRouter(Comments);
