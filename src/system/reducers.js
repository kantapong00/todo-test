import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import todoReducer from './todoReducer'

const reducers = history =>
  combineReducers({
    todos: todoReducer,
    router: connectRouter(history)
  });

export default reducers;
