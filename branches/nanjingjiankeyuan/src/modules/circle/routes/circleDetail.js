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
  Button
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class CircleDetail extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      memberImg: '',
      memberName: '',
      circle: null,
      postingsList: []
    }
  }

//componentWillMount() {
//  this.context.initAction({
//    title: '创建',
//    action: () => {
//      this.props.router.push(`/postingsCreate/${this.props.params.circleId}`)
//    }
//  });
//}

  componentWillUnmount() {
    this.context.clearAction();
  }

  refresh = () => {
    Toast.loading();
    circleApi.circleDetail({
      pageNo: 1,
      circleId: this.props.params.circleId,
      pageSize: 20,
    }).then(result => {
      Toast.hide();
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }
      console.log(result);
      let data = result.data[0];
      this.setState({
        ...data
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  gotoPostingsDetail = (postings) => {
    this.props.router.push('/postings/' + postings.postingsId);
  }

  moreList = (type) => {
    // 1圈子 2帖子
    if (type == 1) {

    } else {

    }
  }

  favorites = (circle) => {
    circleApi.circleFavorites({
      circleId: circle.circleId
    }).then(result => {
      console.log(result);
      if (result.result == 1) {
        this.setState({
          circle: {
            ...this.state.circle,
            isFavorites: this.state.circle.isFavorites == 1 ? 0 : 1
          }
        })
      }
    })
  }

  riokin = (postings) => {
    circleApi.clickGoods({
      postingsId: postings.postingsId
    }).then(result => {
      Toast.info(result.msg, 1, () => {
        this.refresh();
      });
    })
  }

  postings = (postings) => {
    this.props.router.push('/postings/' + postings.postingsId);
  }

  render() {
    const {
      memberImg,
      memberName,
      circle,
      postingsList,
    } = this.state;
    if (!circle) {
      return null;
    }
    const bannerShow = `url(${common.IMAGE_DOMAIN}${circle.circlePhoto}) 100% 100% no-repeat fixed top `;
    const favShow = circle.isFavorites == 1 ? '已关注' : '+关注'
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
    return (
      <div className='fix-scroll hastitle'>
        <div style={{height:'2rem',background:bannerShow}}>
          <WingBlank>
            <Flex>
              <Img src={memberImg} style={{
                height: '1rem',
                width: '1rem',
                borderRadius: '.5rem'
              }} />
              <Flex.Item>
                <p>{circle.circleName}</p>
                <div className='text-overflow-hidden'>{circle.circleDescription}</div>
                <p>人气：{circle.concerns}</p>
              </Flex.Item>
              <Button
                onClick={()=>this.favorites(circle)}
                type='primary' size='small' inline>{favShow}</Button>
            </Flex>
          </WingBlank>
        </div>
        <List>
          {
            postingsList.map(postings => {
              return <Item key={postings.postingsId} >
                <Flex onClick={()=>this.gotoPostingsDetail(postings)}>
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
                <p
                  onClick={()=>this.gotoPostingsDetail(postings)}  
                  dangerouslySetInnerHTML={{ __html: postings.postingsContent }}></p>
                <div>
                  <span onClick={()=>this.riokin(postings)}>点赞{postings.riokin}</span>
                  <span onClick={() => this.postings(postings)}>
                    评论{postings.commentsNum}</span>
                </div>
              </Item>
            })
          }
        </List>
      </div>
    )
  }
}

export default withRouter(CircleDetail);
