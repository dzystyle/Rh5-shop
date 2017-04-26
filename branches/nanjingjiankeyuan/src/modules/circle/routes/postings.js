import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  List,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  InputItem
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class Postings extends Component {
	static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      postings: null,
      commentsList: [],
      postContent: ''
    }
  }
	componentWillMount() {
    this.context.initAction({
      title: '创建',
      action: () => {
        this.props.router.push('/postingsCreate')
      }
    });
  }
	componentWillUnmount() {
    this.context.clearAction();
  }
  refresh = () => {
    Toast.loading();
    circleApi.postingsDetail({
      postingsId: this.props.params.postingsId,
      selectType: 0,
      pageNo: 1
    }).then(result => {
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

  componentDidMount() {
    this.refresh();
  }

  riokin = (postings) => {
    circleApi.clickGoods({
      postingsId: this.props.params.postingsId
    }).then(result => {
      Toast.info(result.msg, 1, () => {
        this.refresh();
      });
    })
  }

  comment = (postings) => {
    // this.props.router.push('/');
  }

  gotoCommentsDetail = (comments) => {
    console.log(comments);
  }

  moreComments = (postings) => {
    this.props.router.push('/comments/' + postings.postingsId);
  }

  renderHeader = (postings) => {
    return <Flex justify='between'>
      <div>评论 {postings.commentsNum}</div>
      <div onClick={()=>this.moreComments(postings)}>更多评论</div>
    </Flex>
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
    circleApi.saveComments({
      postingsId: this.props.params.postingsId,
      comments: postContent
    }).then(result => {
      Toast.info(result.msg, 1, () => {
        this.refresh();
          this.setState({
              postContent: ''
          })
      });
    })
  }

  render() {
    const {
      postings,
      commentsList,
      postContent
    } = this.state;
    if (!postings) {
      return null;
    }
    const IconClass = ({ url }) => {
		  return <div style={{
		    width: '1rem',
		    height: '1rem',
		    borderRadius: '.5rem',
		    background: `url(${url}) center center /  1rem 1rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return (<div className='wx-postings'>
        <div className='fix-scroll hastitle hasbottom'>
        <List>
          <Item>
            <Flex>
              {postings.memberImg==undefined||postings.memberImg==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
					      	<Img src={postings.memberImg}
					        style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '.5rem'
                  }} />}
              <Flex.Item>
                <Flex justify='between'>
                  <p>{postings.postingsName}</p>
                  <p>{postings.createTimeStr}</p>
                </Flex>
              </Flex.Item>
            </Flex>
            <div>
              <p dangerouslySetInnerHTML={{ __html: postings.postingsContent }}></p>
              <span onClick={()=>this.riokin(postings)}>点赞{postings.riokin}</span>
            </div>
          </Item>
        </List>
        <List renderHeader={this.renderHeader(postings)}>
          {
            commentsList.map(comments => {
              return <Item key={comments.commentId} onClick={()=>this.gotoCommentsDetail(comments)}>
                <Flex>
                  {comments.memberAvatar==undefined||comments.memberAvatar==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
					      	<Img src={comments.memberAvatar}
					        style={{
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '.5rem'
                  }} />}
                  <Flex.Item>
                    <Flex justify='between' align='top'>
                      <div>
                        <p>{comments.memberTruename}</p>
                        <p dangerouslySetInnerHTML={{ __html: comments.comments }}></p>
                      </div>
                      <p>{comments.createTimeStr}</p>
                    </Flex>
                  </Flex.Item>
                </Flex>
                <WingBlank>
                {
                  comments.postCommentsVos.map((postComment,index) => {
                      return <Flex key={index}>
                      <Img src={postComment.memberAvatar} style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '.5rem'
                      }} />
                      <div>
                        <span>{postComment.memberTruename}:</span>
                        <p dangerouslySetInnerHTML={{ __html: postComment.comments }}></p>
                      </div>
                    </Flex>
                  })  
                }
                </WingBlank>
                <div onClick={()=> {
                  this.props.router.push('/replys/'+comments.commentId)
                }} style={{textAlign:'center'}}>查看更多</div>
              </Item>
            })
          }
          </List>
        </div>  
        <div className='postings-bottom'>
          <Flex justify='between'>
            <Flex.Item>
              <InputItem
                value={postContent}
                onChange={this.postContentChange}
                placeholder="发表下你的评论"
                ></InputItem>
            </Flex.Item>  
            <Button type='primary'
              onClick={this.saveComment}  
              className='postings-bottom-btn'
              inline>发布</Button>  
          </Flex>
        </div>
      </div>)
  }
}

export default withRouter(Postings);
