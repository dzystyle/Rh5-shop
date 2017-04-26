import React, { Component } from 'react';
import { Menu } from 'antd-mobile';

class GoodsClassMenu extends React.PureComponent {

  onMenuChange = (item) => {
    const ids = item[0].split("-");
    this.props.onMenuChange({ gcAdvid: ids[0], gcId: ids[1] });
    console.log(1)
    
  }

  render() {
    const { data } = this.props;
    let convertedData = data.map(item => {
      return {
        value: `${item.gcAdvid}-${item.gcId}`,
        label: item.gcName,
        isLeaf: true
      }
    });
    if (!convertedData || convertedData.length == 0) {
      return null;
    }

    const height = `${document.documentElement.clientHeight / 100 - 1.8}rem`;
    return <Menu
        style={{fontSize:'.24rem',color:'red'}}
        level={1}
        data={convertedData}
        value={[convertedData[0].value]}
        height={height}
        onChange={this.onMenuChange}
      />
  }
}

export default GoodsClassMenu;
