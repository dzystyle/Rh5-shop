import { handleActions } from 'redux-actions';

const order = handleActions({
  ['init'](state, action) {
    const payload = action.payload
    const { addressList, cartVoList } = payload;
    let selectedAddress = null;
    if (addressList && addressList.length > 0) {
      selectedAddress = addressList[0]
    }
    const mapedCartVoList = cartVoList.map(shop => {
      shop.shipPrice = action.shipData[shop.storeId]
      const selected = Object.keys(shop.shipPrice)[0]
      shop.selectedShip = selected
      return shop;
    })

    return {
      ...state,
      ...payload,
      selectedAddress,
      cartId: action.cartId,
      cartVoList: mapedCartVoList
    };
  },
  ['getPrice'](state, action) {
    const payload = action.payload
    return {
      ...state,
      priceData: payload
    };
  },
  ['addShipping'](state, action) {
    const payload = action.payload
    const { cartVoList } = state;
    const mapedcartVoList = cartVoList.map(shop => {
      shop.shipPrice = payload[shop.storeId]
    })
    console.log(mapedcartVoList);
    return {
      ...state,
      cartVoList: mapedcartVoList
    };
  },
  ['changePd'](state, action) {
    const payload = action.payload
    return {
      ...state,
      ...payload
    };
  },
  ['selectPayType'](state, action) {
    const payload = action.payload
    let isPd = state.isPd;
    // 货到付款，自动切换为不使用余额
    if (payload == 2) {
      isPd = 0;
    }
    return {
      ...state,
      paytype: payload,
      isPd
    };
  },
  ['selectCoupon'](state, action) {
    const payload = action.payload
    return {
      ...state,
      ...payload,
      isInit: false
    }
  },
  ['invoiceChange'](state, action) {
    const payload = action.payload
    return {
      ...state,
      invoice: payload,
      isInit: false
    }
  },
  ['selectAddress'](state, action) {
    const payload = action.payload
    return {
      ...state,
      selectedAddress: payload,
      isInit: false
    }
  },
  ['updateShip'](state, action) {
    const {
      storeId,
      shipType
    } = action.payload

    console.log(storeId, shipType);

    const { cartVoList } = state;
    const mapedcartVoList = cartVoList.map(shop => {
      if (shop.storeId == storeId) {
        shop.selectedShip = shipType
      }
      return shop;
    })
    return {
      ...state,
      cartVoList: mapedcartVoList
    };
  },
}, {
  cartId: null,
  selectedAddress: {},
  priceData: {
    conditionPrice: "0.0",
    couponPrice: "0.0",
    jfprice: 0,
    predepositAmount: "0.0",
    totalFreight: "0.0",
    totalGoodsPrice: "0.0",
    totalPrice: "0.0"
  },
  shipData: {},
  isPd: 1,
  freight: null,
  paytype: 1,
  couponId: null,
  invoice: null,
  addressList: [],
  cartVoList: [],
  couponCount: 0,
  couponMemberMap: {},
  memberAvailable: '0.0',
  isInit: true
});

export default order;
