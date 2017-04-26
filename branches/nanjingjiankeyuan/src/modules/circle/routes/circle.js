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
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;
class Circle extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      hotpostings: [],
      hotCircle: [],
      myCircle: []
    }
  }


  componentWillMount() {
    this.context.initAction({
      title: '创建',
      action: () => {
        this.props.router.push('/circleCreate')
      }
    });
  }

  componentWillUnmount() {
    this.context.clearAction();
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

  gotoPostingsDetail = (postings) => {
    this.props.router.push('/postings/' + postings.postingsId)
  }

  goMy = () => {
    this.props.router.push('/my');
  }

  moreList = (type) => {
    // 1圈子 2帖子
    if (type == 1) {
      this.props.router.push('/circleList')
    } else {
      this.props.router.push('/postingsList')
    }
  }

  render() {
    const { hotCircle, hotpostings } = this.state;
      const IconClass = ({ url }) => {
          return <div style={{
              width: '100%',
              height: '0.9rem',
              background: `url(${url}) center center /  100% 0.9rem no-repeat`,
              display:'inline-block',
              marginRight:'0.1rem'
          }}
          />
      }
      const IconClass1 = ({ url }) => {
		  return <div style={{
		    width: '1.5rem',
		    height: '1.5rem',
		    borderRadius: '.75rem',
		    background: `url(${url}) center center /  1.5rem 1.5rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return (
      <div className='wx-circle'>
        <div  className='fix-scroll hastitle hasbottom'>
        <List>
          <Item>热门圈子</Item>  
          {
            hotCircle.slice(0,4).map(circle => {
              return <Item key={circle.circleId} onClick={()=>this.gotoCircleDetail(circle)}>
                <Flex>
                  <div>
                    {circle.circlePhoto==undefined||circle.circlePhoto==''?<IconClass1 url={'./assets/img/img_default.png'}></IconClass1>:
							      	<Img src={circle.circlePhoto}
							        style={{width:'1.5rem',height:'1.5rem',borderRadius: '.75rem'}} />}
                  </div>
                  <Flex.Item>
                    <p>{circle.circleName}</p>
                    <div className='text-overflow-hidden'>{circle.circleDescription}</div>
                    <p>{circle.concerns}</p>
                  </Flex.Item>
                  <div>
                    <Button inline size='small' type='primary'>
                    {
                      circle.isFavorites==1?'已关注':'+关注'
                    }
                    </Button>
                  </div>
                </Flex>
              </Item>
            })
          }
          <Item><div style={{ textAlign: 'center' }} onClick={()=>this.moreList(1)}>更多</div></Item>  
        </List>
        <List>
          <Item>热门帖子</Item>  
          {
            hotpostings.slice(0,4).map(postings => {
              return <Item key={postings.postingsId} onClick={()=>this.gotoPostingsDetail(postings)}>
                <Flex>
                  {postings.memberImg==undefined||postings.memberImg==''?<IconClass1 url={'./assets/img/img_default.png'}></IconClass1>:
							      	<Img src={postings.memberImg}
							        style={{width:'1.5rem',height:'1.5rem',borderRadius: '.75rem'}} />}
                  <Flex.Item>
                    <p>{postings.postingsName}</p>
                  </Flex.Item>
                </Flex>
              </Item>
            })
          }
          <Item><div style={{textAlign:'center'}} onClick={()=>this.moreList(2)}>更多</div></Item>  
          </List>
        </div>  
        <div className='circle-bottom' onClick={this.goMy}>
          <div><IconClass url={'./assets/img/iv_qz.png'}></IconClass></div>
          {/*<img src='/assets/img/iv_qz.png'  style={{height: '0.9rem', width: '100%',}}/>*/}
        </div>
      </div>
    )
  }
}

export default withRouter(Circle);
