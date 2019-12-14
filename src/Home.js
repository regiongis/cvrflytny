import React from "react";
import { createHistory, LocationProvider, Router } from "@reach/router";
import createHashSource from "hash-source";
import App from "./App";

let source = createHashSource();
let history = createHistory(source);

const Home = () => (
  <LocationProvider history={history}>
    <Router>
      <App path="/" />
      <App path="/:komnr" />
    </Router>
  </LocationProvider>
);

export default Home;
