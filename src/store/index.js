import { configureStore } from '@reduxjs/toolkit';

import reducer from './aviasales';

const store = configureStore({
  reducer,
});

export default store;
