import { createMemoryHistory } from "history";
import { applyMiddleware, createStore, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import createReducer from "./reducers";

export const history = createMemoryHistory();
export const store = createStore(
  createReducer(history),
  compose(applyMiddleware(routerMiddleware(history)))
);
