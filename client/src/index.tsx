/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import RoutedApp from './App'

import store from "./redux/store"

ReactDOM.render(
  // eslint-disable-next-line react/react-in-jsx-scope
  <Provider store={store}>
    <RoutedApp />
  </Provider>,
  document.getElementById('root')
);
