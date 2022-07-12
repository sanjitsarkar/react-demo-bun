import React, { useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";
import Promise from "./polyfills/Promise";

function App() {
  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => reject("success"), 1000);
    })
      .then((value) => {
        console.log(value);
      })
      .catch((value) => {
        console.log(value);
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Welcome to React!</h3>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
