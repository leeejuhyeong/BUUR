import React from "react";
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

// Root Component에 BrowserRouter 적용
// 나중에 Redux 사용할때 Provider를 통해 프로젝트에 리덕스를 연결시켜 준다
const Root = () => (
  <BrowserRouter>
  <Provider store={store}>
      <App/>
  </Provider>
  </BrowserRouter>
);

export default Root;