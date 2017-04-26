import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button,
  SegmentedControl
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../api/order';
import ProgressItem from '../../components/ProgressItem';

import './progress.less';

class Progress extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    }
  }

  refreshList = () => {
    const type = this.props.params.type ? this.props.params.type : 0;
    if (type == 0) {
      orderApi.returnList({
        pageNo: 1,
        pageSize: 10
      }).then(result => {
        if (result.result == 1 && result.data) {
          this.setState({
            dataSource: this.ds.cloneWithRows(result.data)
          })
        }
      })
    } else {
      orderApi.barterList({
        pageNo: 1,
        pageSize: 15
      }).then(result => {
        if (result.result == 1 && result.data) {
          this.setState({
            dataSource: this.ds.cloneWithRows(result.data)
          })
        }
      })
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.type !== this.props.params.type) {
      this.refreshList();
    }
  }

  onChange = (index) => {
    this.props.router.replace('/progress/' + index);
  }

  onFinishBarter = () => {
    this.refreshList();
  }

  render() {
    const { dataSource } = this.state
    let type = this.props.params.type
    type = (type && parseInt(type)) || 0

    const listHeight = `${document.documentElement.clientHeight/100 - 1.7}rem`

    return (
      <div className="wx-progress fix-scroll">
          <SegmentedControl
            style={{ height: '0.8rem',width:'100%'}}  
            tintColor={'#ff0000'}
            onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
            selectedIndex={type}
            values={['退款退货列表', '换货列表']} />
            <ListView
              style={{
                height: listHeight,
                overflowY: 'auto',
              }}
              dataSource={dataSource}
              renderRow={(dataItem) => (
              <ProgressItem
                onFinishBarter={this.onFinishBarter}
                type={type}
                dataItem={dataItem}></ProgressItem>
              )}></ListView>
      </div>
    )
  }
}

export default withRouter(Progress);
