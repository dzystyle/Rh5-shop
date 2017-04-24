import React, { Component } from 'react';
import { Flex, List, Grid } from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

class GoodsList extends Component {

  onMenuChange = (item) => {
    alert(item);
  }

  render() {
    const { data } = this.props;
    const { advPosition, classCustomList } = data;

    if (!advPosition) {
      return null;
    }

    console.log(data);

    return <div>
      <div>
        <Img src={advPosition.advList[0].resUrl} style={{width:'100%',height:'2rem'}}></Img>
      </div>
      {
        classCustomList && classCustomList.map(customList => {
          const gridData = customList.classCustomList.map((item) => {
            return {
              icon: `${common.IMAGE_DOMAIN}${item.gcPic}`,
              text:item.gcName
            }
          });
          return <List key={customList.gcId} renderHeader={() => customList.gcName}>
            <Grid data={gridData} columnNum={3} />
          </List> 
        })
      }
    </div>
  }
}

export default GoodsList;
