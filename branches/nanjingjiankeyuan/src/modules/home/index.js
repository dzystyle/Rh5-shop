import { Startup } from 'common';

new Startup({
  allReducers: require('./reducers/index'),
  routes: require('./routes/index'),
  reducers: ['./reducers/index']
}).run(() => {});
