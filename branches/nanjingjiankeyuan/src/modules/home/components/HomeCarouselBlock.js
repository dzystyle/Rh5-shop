import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Carousel } from 'antd-mobile';
import { Img } from 'commonComponent';

import './HomeCarouselBlock.less'

class HomeCarouselBlock extends Component {
  render() {
    const { data } = this.props;
    return <Carousel
        className="index-banner" autoplay={true} infinite dots={false}>
          {
            data.map((item,index) => (
              <div key={`carousel-${index}`}>
                <a href={item.advUrl}>
                  <Img src={item.resUrl} />
                </a>
              </div>
            ))
          }
      </Carousel>
  }
}

export default withRouter(HomeCarouselBlock);
