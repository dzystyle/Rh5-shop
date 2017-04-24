import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  List,
  InputItem
} from 'antd-mobile';
import * as contentApi from '../api/content';
import { Img } from 'commonComponent';
import './content.less';

const Item = List.Item;

class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentEntity: null,
      commentList: [],
      postContent: '',
    }
  }

  refresh = () => {
    Toast.loading();
    contentApi.detailed({
      contentId: this.props.params.id
    }).then(result => {
      Toast.hide();
      if (result.result == 1) {
        let data = result.data;
        this.setState({
          contentEntity: data.contentEntity[0],
          commentList: data.commentList
        })
      }
    });
  }

  componentDidMount() {
    this.refresh();
  }

  postContentChange = (val) => {
    this.setState({
      postContent: val
    })
  }

  saveComment = () => {
    const postContent = this.state.postContent
    if (postContent == '') {
      Toast.info('请输入评论内容', 1)
      return;
    }

    this.setState({
      postContent: ''
    })

    contentApi.saveComment({
      contentId: this.props.params.id,
      contentComment: postContent
    }).then(result => {
      Toast.info(result.msg, 1, () => {
        this.refresh();
      });
    })
  }

  renderHeader = (contentEntity) => {
    return <Flex justify='between'>
      <div>评论({contentEntity.commentNum})</div>
      <div onClick={() => {
        this.props.router.push('/comments/' + this.props.params.id)
      }}>更多</div>
    </Flex>
  }

  render() {
    const {
      contentEntity,
      commentList,
      postContent
    } = this.state;
    if (!contentEntity) {
      return null;
    }
    return (
      <div className='fix-scroll hastitle hasbottom'>
        <Flex direction='column' justify='center'>
          <div style={{ textAlign: 'center' }}>
            <h4>{contentEntity.title}</h4>
          </div>
          <div style={{
            color:'gray'
          }}>文章来源: {contentEntity.source} 作者: {contentEntity.author} 发布时间: {contentEntity.publishedStr.substr(0,10)} </div>
          
          <div dangerouslySetInnerHTML={{ __html: contentEntity.content }}></div>
        </Flex>
        <List renderHeader={this.renderHeader(contentEntity)}>
          {
            commentList && commentList.map(comment => {
              return <Item key={comment.commentid}>
                <Flex align='top'>
                  <Img src={comment.memberAvatar} style={{
                    width: '1rem',
                    height: '1rem',
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

        <div className='content-bottom'>
          <Flex justify='between' style={{background:'#fff',borderTop:'1px solid #000'}}>
            <Flex.Item>
              <InputItem style={{borderTop:'1px solid #000'}}
                value={postContent}
                onChange={this.postContentChange}
                placeholder="发表下你的评论"
                ></InputItem>
            </Flex.Item>  
            <Button type='primary'
              onClick={this.saveComment}  
              style={{border:0}}
              className='postings-bottom-btn'
              inline>发布</Button>  
          </Flex>
        </div>
      </div>
    )
  }
}

export default withRouter(ContentDetail);
