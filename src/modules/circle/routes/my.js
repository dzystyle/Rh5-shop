import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Tabs,
  Grid,
  Icon,
  Modal
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as circleApi from '../api/circle';
import deleteIcon from 'svg/delete.svg';

import './circle.less';
const TabPane = Tabs.TabPane;
class My extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postingsList: [],
      myCircleList: [],
      activeKey: "1",
      memberDetail: null
    }
  }

  initCircle = () => {
    circleApi.myCircle().then(result => {
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data[0];
      this.setState({
        myCircleList: data.myCircle
      });
    });
  }

  initPostings = () => {
    circleApi.postingsList({
      pageNo: 1,
      pageSize: 50
    }).then(result => {
      if (result.result != 1) {
        Toast.error(result.msg);
        return;
      }

      let data = result.data;
      this.setState({
        postingsList: data.postingsVoList
      });
    });
  }

  componentDidMount() {
    circleApi.memberDetail().then(result => {
      if (result.result == 1) {
        this.setState({
          memberDetail: result.data[0]
        })
      }
    })
    this.onChange("1");
  }

  onChange = (key) => {
    this.setState({
      activeKey: key
    })
    if (key == "1") {
      this.initCircle();
    } else {
      this.initPostings();
    }
  }

  renderItem = (dataItem) => {
  	const IconClass = ({ url }) => {
		  return <div style={{
		    width: '1.5rem',
		    height: '1.5rem',
		    borderRadius: '.75rem',
		    background: `url(${url}) center center /  1.5rem 1.5rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return <Flex direction='column'>
      	{dataItem.circlePhoto==undefined||dataItem.circlePhoto==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
      	<Img src={dataItem.circlePhoto}
        style={{
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '.75rem'
        }} />}
      <p>{dataItem.circleName}</p>
    </Flex>
  }

  gotoCircleDetail = (circle) => {
    this.props.router.push('/circleDetail/' + circle.circleId)
  }

  gotoPositingsDetail = (postings) => {
    this.props.router.push('/postings/' + postings.postingsId)
  }

  deletePostings = (postings) => {
    Modal.alert('提醒', '是否删除该帖子', [{
      text: '取消'
    }, {
      text: '确定',
      onPress: () => {
        circleApi.deletePosting({
          postingsId: postings.postingsId
        }).then(result => {
          Toast.info(result.msg, 1, () => {
            this.onChange(this.state.activeKey)
          })
        })
      }
    }]);
    return false;
  }

  render() {
    const { postingsList, myCircleList, activeKey, memberDetail } = this.state;
    return (
      <div className='wx-circle-my'>
        <Flex className='my-header' justify='center'>
          <div>
            <div>
              <Img src={memberDetail && memberDetail.memberAvatar} style={{
              width: '1rem',
              height: '1rem',
              borderRadius: '.5rem'
            }} />
            </div>  
            <span>{memberDetail && memberDetail.memberName}</span>
          </div>
        </Flex>
        <div>
          <Tabs activeKey={activeKey} onChange={this.onChange} swipeable={false}>
            <TabPane tab="我的圈子" key="1">
              <WhiteSpace></WhiteSpace>
              <Grid data={myCircleList}
                onClick={(data)=>this.gotoCircleDetail(data)}  
                renderItem={this.renderItem}  
                columnNum={4} hasLine={false} />
            </TabPane>
            <TabPane tab="我的帖子" key="2">
              <WhiteSpace></WhiteSpace>
              <WingBlank style={{backgoundColor:'white',height:'10.7rem'}}>
              {
                postingsList.map(postings => {
                    return <div onClick={() => {
                    this.gotoPositingsDetail(postings)
                  }} key={postings.postingsId}>
                  <Flex justify='between'>
                    <div>{postings.createTimeStr}</div>
                    <Icon type={deleteIcon} onClick={(e) => {
                      e.stopPropagation();
                      this.deletePostings(postings)
                    }} />
                  </Flex>
                  <p dangerouslySetInnerHTML={{ __html: postings.postingsContent }}></p>
                  <Flex>
                    <span style={{
                      paddingRight:'.1rem'
                    }}>喜欢</span>
                    <span>评论</span>
                  </Flex>
                  <WhiteSpace></WhiteSpace>
                </div>
                })
              }
              </WingBlank>  
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default withRouter(My);
