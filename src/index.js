import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

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
