import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk'
import { common } from 'common'

export default class Startup {
  constructor(options) {
    this.options = options;
    this.createStore();
  }

  createStore = () => {
    // console.log('createStore')
    const { allReducers } = this.options;
    /**
     * A middleware you can apply to your Redux store to capture dispatched actions created by the action creators. It will redirect those actions to the provided history instance.
     */
    let middlewares = [thunk, routerMiddleware(hashHistory)];
    /**
     * @returns {Function} A function obtained by composing the argument functions
     * from right to left. For example, compose(f, g, h) is identical to doing
     * (...args) => f(g(h(...args))).
     */
    const enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
    /**
     *You must add this reducer to your store for syncing to work.
     *A reducer function that stores location updates from history. If you use combineReducers, it should be nested under the “routing” key.
     */
    let combinedReducers = combineReducers({
      ...allReducers,
      routing: routing
    });

    this.store = createStore(combinedReducers, {}, enhancer);
  }
  hotReloadReducerModule = () => {
    // console.log('hotReloadReducerModule')
    const { reducers, allReducers } = this.options;
    if (module.hot) {
      module.hot.accept(reducers, () => {
        let combinedReducers = combineReducers({
          ...allReducers,
          routing: routing
        });
        this.store.replaceReducer(combinedReducers);
      });
    }
  }
  hotReloadReactModule = () => {
    // console.log('hotReloadReactModule')
    const routesIndex = this.options.routesIndex;
    if (module.hot) {
      const renderNormally = this.render;
      const renderException = (error) => {
        const RedBox = require('redbox-react');
        ReactDOM.render(<RedBox error={error} />, document.getElementById('root'));
      };
      const _render = () => {
        try {
          renderNormally();
        } catch (error) {
          console.error('error', error);
          renderException(error);
        }
      };
      module.hot.accept(routesIndex, () => {
        _render();
      });
    }
  }
  render = () => {
    // console.log('render')
    const _history = syncHistoryWithStore(hashHistory, this.store);
    const Routes = this.options.routes;
    ReactDOM.render(
      <Provider store={this.store}>
      <Routes history={_history}>
      </Routes>
    </Provider>, document.getElementById('root'));
  }
  run = (cb) => {
    this.render();
    this.hotReloadReactModule();
    if (!!cb) {
      cb();
    }
  }
}
