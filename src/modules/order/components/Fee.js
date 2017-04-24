import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Fee extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return <List renderHeader={()=>'平台自营'}> 
      <Item
        arrow="horizontal"
        multipleLine>
        <Brief>设置了Click事件会有material水波纹点击效果</Brief>
      </Item>
    </List>
  }
}

export default Fee;
