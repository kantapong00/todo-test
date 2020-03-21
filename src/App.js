import React from 'react';
import './App.css';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { store, history } from "./system/store";
import Router from './system/router';

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </Provider>
  )
}
