import React, { Component } from 'react';
import { Img } from 'commonComponent';
import {
  Flex,
  Button,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';
import { common } from 'common';

class CommentImg extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      score: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    if (nextProps.score) {
      this.setState({
        score: nextProps.score
      })
    }
  }

  changeScore = (score) => {
    if (score == this.state.score) {
      return;
    }
    this.setState({
      score
    });
    if (this.props.onChangeScore) {
      this.props.onChangeScore(score);
    }
  }

  render() {
    const { score } = this.state;
    return <div>
      {
        [...Array(5)].map((item,index) => {
          const filename = index < score ? 'b_1_h_2.png':'b_1_h_1.png'
          const imgUrl = `${common.SERVER_DOMAIN}/res_v4.0/h5/images/${filename}`

          return <span key={index} style={{margin:'0 0.1rem'}}>
            <img src={imgUrl} onClick={()=>this.changeScore(index+1)}
              style={{ width: '.32rem', height: '.32rem' }} />
          </span>  
        })
      }
    </div>
  }
}

export default CommentImg;
