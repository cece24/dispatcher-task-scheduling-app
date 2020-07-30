import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import Schedule from "./features/schedule/Schedule";

import tasks from "./features/task/tasks";

const store = createStore(combineReducers({ tasks }));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Schedule />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
