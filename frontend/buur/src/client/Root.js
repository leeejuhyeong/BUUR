import React from "react";
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

// Root Component에 BrowserRouter 적용
// 나중에 Redux 사용할때 Provider를 통해 프로젝트에 리덕스를 연결시켜 준다
const Root = () => (
  <BrowserRouter>
      <App/>
  </BrowserRouter>
);

export default Root;