import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import RoutedApp from './App'

import store from "./redux/store"

ReactDOM.render(
  <Provider store={store}>
    <RoutedApp />
  </Provider>,
  document.getElementById('root')
);
