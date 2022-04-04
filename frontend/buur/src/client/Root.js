import React from "react";
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from '../store';

const persistor = persistStore(store);

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
        </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default Root;