import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Carousel,
  Modal,
  Tabs,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button
} from 'antd-mobile';
import * as contentApi from '../api/content';
import { Img } from 'commonComponent';
import './content.less';

const TabPane = Tabs.TabPane;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: [],
      advlist: [],
      conList: [],
      activeKey: null
    }
  }

  componentDidMount() {
    Toast.loading();
    contentApi.index().then(result => {
      Toast.hide();
      let data = result.data;
      const classList = data.classList;
      let currentClass;
      if (classList.length > 0) {
        currentClass = classList[0]
      }
      const activeKey = currentClass.acId
      this.setState({
        classList,
        activeKey
      });

      this.onChangeTab(activeKey);
    });
  }

  onChangeTab = (acId) => {
    this.setState({
      activeKey: acId
    })
    contentApi.articleList({ acId }).then(result => {
      const data = result.data
      this.setState({
        conList: data.conList,
        advlist: data.advlist,
      })
    })
  }

  gotoDetail = (detail) => {
    this.props.router.push('/contentDetail/' + detail.id)
  }

  render() {
    const {
      classList,
      advlist,
      activeKey,
      conList
    } = this.state;
    if (!activeKey) {
      return null;
    }
    const IconClass = ({ url }) => {
		  return <div style={{
		    width: '2rem',
		    height: '2rem',
		    background: `url(${url}) no-repeat center center /  2rem 2rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return (
      <div className='fix-scroll hastitle'>
        <Tabs activeKey={activeKey}
          swipeable={false}
          onChange={this.onChangeTab}>
          {
            classList.map((item,index)=>{
              return <TabPane tab={item.acName} key={item.acId}>
                <Carousel
                  autoplay={true}
                  style={{height:'2rem'}}>
                  {
                    advlist.map(adv => {
                      return <Img key={adv.id} src={adv.thumb} style={{width:'100%',height:'2rem'}}/>
                    })
                  }  
                </Carousel>
                <div>
                {
                  conList && conList.map((con,i) => {
                    return <WingBlank key={i}>
                      <WhiteSpace></WhiteSpace>
                      <Flex onClick={()=>this.gotoDetail(con)} style={{ height: '2.8rem',borderBottom:'1px solid #444'}}>
                        {con.thumb==undefined||con.thumb==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
								      	<Img src={con.thumb}
								        style={{ width: '2rem', height: '2rem' }} />}
                        <Flex.Item>
                          <Flex justify='between'>
                            <Button size='small' inline>{con.catName}</Button>
                            <span style={{fontSize:'.24rem'}}>发布时间: {con.publishedStr.substr(0,10)}</span>
                          </Flex>
                          <p className='text-overflow-hidden'>{con.title}</p>
                          <div style={{height:'1.2rem',lineHeight:'0.4rem',color:'gray'}}>{con.digest}</div>
                        </Flex.Item>
                      </Flex>
                    </WingBlank>    
                  })
                }  
                </div>  
              </TabPane>
            })
          }
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Content);
