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
		const IconClass = ({ url }) => {
		  return <div style={{
		    width: '100%',
		    height: '2rem',
		    background: `url(${url}) center center /  2rem 2rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return <div>
      <div>
        {advPosition.advList[0].resUrl==undefined||advPosition.advList[0].resUrl==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:
      	<Img src={advPosition.advList[0].resUrl}
        style={{width:'100%',height:'2rem'}} />}
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
