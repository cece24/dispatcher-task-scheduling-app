import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Schedule } from "./features/schedule/Schedule";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Schedule></Schedule>
    </div>
  );
}

export default App;
