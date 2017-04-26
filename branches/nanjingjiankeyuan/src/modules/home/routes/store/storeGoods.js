//import React, { Component } from 'react'
//import { withRouter, Link } from 'react-router'
//import {
//Toast,
//Flex,
//Button,
//ListView,
//WingBlank,
//WhiteSpace,
//} from 'antd-mobile';
//import { Img } from 'commonComponent';
//import { common } from 'common';
//import GoodsSearch from '../../components/GoodsSearch';
//import * as storeApi from '../../api/store';
//
//import './store.less';
//
//// const Item = List.Item;
//
//class StoreGoods extends Component {
//constructor(props) {
//  super(props);
//  this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//
//  this.state = {
//    dataSource: this.ds.cloneWithRows([]),
//  }
//}
//
//componentDidMount() {
//  // storeApi.storegoods({
//  //   order: 'desc',
//  //   orderField: '',
//  //   pageNo: 1,
//  //   pageSize: 20,
//  //   goodsName: null,
//  //   storeId: this.props.params.storeId
//  // }).then(result => {
//  //   if (result.result == 1) {
//  //     const data = result.data;
//  //     console.log(data);
//  //     // this.setState({
//  //     //   goodsList: data.goodsList,
//  //     //   store: data.store[0]
//  //     // })
//  //   }
//  // });
//}
//
//onClick = (dataItem) => {
//  // common.gotoGoodsDetail({ specId: dataItem.specId })
//}
//
//render() {
//  const { goodsList } = this.state;
//  const data = {
//    storeId: this.props.params.storeId,
//    goodsName: this.props.params.goodsName
//  }
//  return <div className='wx-storegoods'>
//    <GoodsSearch data={data}></GoodsSearch>
//  </div>
//}
//}
//
//export default withRouter(StoreGoods);



import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Icon,
  ListView,
  Button,
  InputItem
} from 'antd-mobile';
import GoodsSearchComp from '../../components/GoodsSearch';
import classnames from 'classnames';
import { common } from 'common';
import { Img } from 'commonComponent';
import GoodsSearchSpecFilter from '../../components/GoodsSearchSpecFilter';
import Immutable from 'immutable';

import * as goodsApi from '../../api/goods';
import * as storeApi from '../../api/store';

import '../goodsSearch.less';

class StoreGoods extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      sortField: '',
      sortOrder: 'asc',
      open: false,
      specList: [],
      maximumPrice: '',
      minimumPrice: '',
      layoutType: 1
    }
  }
  componentWillUnmount() {
    this.context.clearAction();
  }

  refreshList = (sortField) => {
    const specValueIds = [];
    const mapedList = this.state.specList.forEach(specItem => {
      specItem.specValueList.forEach(specValue => {
        if (specValue.checked) {
          specValueIds.push(specValue.spValueId);
        }
      })
    });
    console.log(specValueIds);

    storeApi.storegoods({
    	orderField:sortField,
      order: this.state.sortOrder,
      pageNo: 1,
      pageSize: 20,
      goodsName: this.props.params.goodsName,
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          dataSource: this.ds.cloneWithRows(result.data)
        })
      }
    })
  }

  componentWillMount() {

       this.context.initAction({
         title: '切换',
         action: () => {
           this.setState({
             layoutType: this.state.layoutType == 1 ? 2 : 1
           })
           this.refreshList();
         }
       });
    // 查询列表
    this.refreshList();

    // 初始化过滤条件
    goodsApi.goodsfiltermore({
      keyword: this.props.params.keyword,
      searchType: this.props.params.searchType,
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        if (data && data.length > 0) {
          const specList = data[0].specList;
          this.setState({
            specList
          });
        }
      }
    })
  }

  resetSpec = () => {
    const specList = this.state.specList;
    const mapedList = specList.map(specItem => {
      const specValueList = specItem.specValueList.map(specValue => {
        specValue.checked = false;
        return specValue;
      })
      specItem.specValueList = specValueList;
      return specItem;
    });
    this.setState({
      specList: mapedList
    })
  }

  // 修改价格过滤
  changePrice = (priceFilter) => {
    this.setState({
      ...priceFilter
    })
  }

  filterBySpec = () => {
    console.log(this.state);
    this.setState({
      open: false
    })
    this.refreshList();
  }

  onClickSpValue = (spec, spValue) => {
    const specList = this.state.specList;
    let mapedList = null;
    // 当前选择的规格值是选中状态
    if (spValue.checked) {
      mapedList = specList.map(specItem => {
        if (specItem.spId == spec.spId) {
          console.log(specItem);
          const specValueList = specItem.specValueList.map(specValue => {
            if (specValue.spValueId == spValue.spValueId) {
              specValue.checked = false;
            }
            return specValue;
          })
          specItem.specValueList = specValueList;
        }
        return specItem;
      });
      console.log(mapedList);
    } else {
      mapedList = specList.map(specItem => {
        if (specItem.spId == spec.spId) {
          const specValueList = specItem.specValueList.map(specValue => {
            if (specValue.spValueId == spValue.spValueId) {
              specValue.checked = true;
            } else {
              specValue.checked = false;
            }
            return specValue;
          })
          specItem.specValueList = specValueList;
        }
        return specItem;
      });
    }
    this.setState({
      specList: mapedList
    })
  }

  renderItem = (dataItem) => {
    return <Flex style={{borderBottom:'1px solid #000'}} onClick={() => common.gotoGoodsDetail({specId:dataItem.specId})}>
      <Flex.Item style={{flex:1,paddingLeft:'16px'}}>
        <Img src={dataItem.goodsImage} style={{width:'1.5rem',height:'1.5rem'}}/>
      </Flex.Item>
      <Flex.Item style={{flex:3}}>
        <div style={{width:'100%',height:'100%'}}>
          <div style={{paddingRight:'20px'}}>
            {dataItem.goodsName}
          </div>
          <WhiteSpace></WhiteSpace>
          <div style={{color:'red'}}>
            {`¥${dataItem.goodsPrice}`}
          </div>
          <Flex>
            <Flex.Item style={{color:'red'}}>{dataItem.storeName}</Flex.Item>
            <Flex.Item style={{flex:0}}></Flex.Item>
            <Flex.Item className="rsale" style={{marginLeft:'1rem'}}>
              评论{dataItem.commentnum}条 销量 {dataItem.salenum}
            </Flex.Item>
          </Flex>
        </div>  
      </Flex.Item>
    </Flex>
  }
	renderItem1 = (dataItem) => {
    return <Flex style={{fontSize: '.24rem',
    	width:'50%',
    	float:'left',
      color: 'gray',
			textAlign: 'center',paddingBottom:'20px',margin:'0.2rem 0'}} direction='column' onClick={() => onClick(dataItem)}       
			> 
    <Flex.Item>
      <Img src={dataItem.goodsImage} style={{width:'3rem',height:'3rem' }} />
    </Flex.Item>
    <Flex.Item style={{width:'97%'}}>
      <div style={{fontSize: '.24rem',
      color: 'gray',
      paddingLeft:'20px',
      paddingRight:'20px'}} className='text-overflow-hidden'>{dataItem.goodsName}</div> 
    </Flex.Item>
    <Flex.Item>
      <div style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsPrice}`}</div>
    </Flex.Item>
  </Flex>
  }
  changeOrder = (sortField) => {
    this.setState({
      sortField,
      sortOrder: this.state.sortOrder == 'desc' ? 'asc' : 'desc'
    })
    this.refreshList(sortField);
  }

  onClickFilter = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { data, sortField, sortOrder, specList } = this.state;
    const allUpClass = classnames('wx-goods-search-order-up', {
      'selected': sortField == '' && sortOrder == 'desc'
    })
    const allDownClass = classnames('wx-goods-search-order-down', {
      'selected': sortField == '' && sortOrder == 'asc'
    })

    const salenumUpClass = classnames('wx-goods-search-order-up', {
      'selected': sortField == 'salenum' && sortOrder == 'desc'
    })
    const salenumDownClass = classnames('wx-goods-search-order-down', {
      'selected': sortField == 'salenum' && sortOrder == 'asc'
    })

    const goodsStorePriceUpClass = classnames('wx-goods-search-order-up', {
      'selected': sortField == 'goodsStorePrice' && sortOrder == 'desc'
    })
    const goodsStorePriceDownClass = classnames('wx-goods-search-order-down', {
      'selected': sortField == 'goodsStorePrice' && sortOrder == 'asc'
    })

    return <div className='wx-goods-search-page'>
      {
        this.state.open ? <GoodsSearchSpecFilter
          changePrice={this.changePrice}  
          onClickSpValue={this.onClickSpValue}
          resetSpec={this.resetSpec}
          filterBySpec={this.filterBySpec}
          maximumPrice={this.state.maximumPrice}
          minimumPrice={this.state.minimumPrice}
          specList={specList} /> : null
      }
      {
        this.state.open ? <div onClick={() => this.setState({
          open:false
        })} className="am-modal-mask"></div> : null
      }
        <Flex className='wx-goods-search-header'>
          <Flex.Item onClick={()=>this.changeOrder('')}>
            {
              sortField == '' ? <span style={{color:'red'}}>综合</span>:'综合'
            }  
            <div className='wx-goods-search-order'>
              <Icon className={allUpClass} type="up" />
              <Icon className={allDownClass} type="down" />
            </div>
          </Flex.Item>
          <Flex.Item onClick={()=>this.changeOrder('salenum')}>
            {
              sortField == 'salenum' ? <span style={{color:'red'}}>销量</span>:'销量'
            }  
            <div className="wx-goods-search-order">
              <Icon className={salenumUpClass} type="up" />
              <Icon className={salenumDownClass} type="down" />
            </div>
          </Flex.Item>
          <Flex.Item onClick={()=>this.changeOrder('goodsStorePrice')}>
            {
              sortField == 'goodsStorePrice' ? <span style={{color:'red'}}>价格</span>:'价格'
            }  
            <div className="wx-goods-search-order">
              <Icon className={goodsStorePriceUpClass} type="up"/>
              <Icon className={goodsStorePriceDownClass} type="down" />
            </div>
          </Flex.Item>
          <Flex.Item onClick={()=>this.onClickFilter()}>
            筛选<img style={{width:'.2rem',height:'.2rem'}} src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/list_saixuan.png`} />
          </Flex.Item>
        </Flex>
        <div className='fix-scroll' style={{paddingTop:'1.9rem'}}>
          <ListView
            style={{
              height:'100%'
            }}  
            dataSource={this.state.dataSource}
            renderRow={this.state.layoutType==1?this.renderItem:this.renderItem1}
            delayTime={10}>
            </ListView>
        </div>
    </div>
  }
}

export default withRouter(StoreGoods);

