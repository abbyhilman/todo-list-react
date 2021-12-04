import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(ReduxThunk)
);

export default store;
