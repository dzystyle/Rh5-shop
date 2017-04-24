import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  TextareaItem,
  ImagePicker,
  Checkbox
} from 'antd-mobile';
import { Img } from 'commonComponent';
import CommentImg from '../components/CommentImg';
import { common } from 'common';
import * as orderApi from '../api/order';
import './comment.less';

const AgreeItem = Checkbox.AgreeItem;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      gevalIsAnonymous: 0,
      gevalScore: 0,
      gevalContent: '',
      sevalDeliverycredit: 0,
      sevalDesccredit: 0,
      recId: '',
      imgUrl: '',
      sevalServicecredit: 0,
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  postComment = () => {
    const { goods, orderSn } = this.props.location.state;
    const files = this.state.files;
    if (this.state.gevalContent == '') {
      Toast.info('请填写评论', 1)
      return;
    }

    if (files.length == 0) {
      orderApi.saveReviews({
        ...this.state,
        orderSn,
        recId: goods.recId,
      }).then(r => {
        if (r.result == 1) {
          Toast.info(r.msg);
          this.props.router.push('/orderList/3')
        } else {
          Toast.info(r.msg);
        }
      })
      return;
    }

    orderApi.filesUpload({
      images: files.map(item => item.file)
    }).then(result => {
      // 上传图片成功
      if (result.result == 1) {
        const imgUrl = result.data;
        orderApi.saveReviews({
          ...this.state,
          imgUrl,
          orderSn,
          recId: goods.recId,
        }).then(r => {
          if (r.result == 1) {
            Toast.info(r.msg);
            this.props.router.push('/orderList/3')
          } else {
            Toast.info(r.msg);
          }
        })
      }
    })
  }

  // 修改评分
  onChangeScore = (key, score) => {
    this.setState({
      [key]: score
    })
  }

  onChangeComment = (value) => {
    this.setState({
      gevalContent: value
    })
  }

  render() {
    const { goods } = this.props.location.state;
    const {
      files,
      gevalIsAnonymous,
      gevalContent
    } = this.state;
    return (
      <div className="wx-comment fix-scroll">
        <Flex style={{backgroundColor:'white',marginTop:'0.9rem'}}>
          <Img src={goods.goodsImage} style={{width:'2rem',height:'2rem'}} />
          <Flex.Item>
            <p style={{marginRight:'0.2rem'}}>{goods.goodsName}</p>
            <p style={{color:'red'}}>{`￥${goods.goodsPrice}`}</p>
          </Flex.Item>
        </Flex>
        <WhiteSpace style={{
          backgroundColor: '#ebebef',
          height: '0.2rem'
        }}></WhiteSpace>
        <TextareaItem
          onChange={(value)=>this.onChangeComment(value)}
            placeholder="请填写您对商品的评价"
            rows={5}
        />
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>整体评价:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={score => {
                this.onChangeScore('gevalScore',score)
              }} />
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>发货速度:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalDeliverycredit',score)
              }} />
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>服务态度:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalServicecredit',score)
              }} />
            </div>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <div>描述相符:</div> 
            <div className="commstar-mod">
              <CommentImg onChangeScore={(score) => {
                this.onChangeScore('sevalDesccredit',score)
              }} />
            </div>
          </Flex>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 3}
          />
        </WingBlank>
        <div style={{position:'fixed',bottom:'0px',left:'0px',width:'100%',height:'100px',background:'#fff'}}>
          <Flex justify='between' >
            <AgreeItem
                checked={gevalIsAnonymous==1}
                onChange={e => this.setState({
                    gevalIsAnonymous: e.target.checked ? 1:0
                })}>
              匿名评价
            </AgreeItem>
            <WingBlank>
              <Button inline type='ghost' onClick={this.postComment}>发表</Button>
            </WingBlank>
          </Flex>
        </div>
      </div>
    )
  }
}

export default withRouter(Comment);
