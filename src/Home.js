import React from "react";
import { Router } from "@reach/router";
import App from "./App";

const Home = () => (
  <Router>
    <App path="cvrflytny/" />
    <App path="cvrflytny/:komnr" />
  </Router>
);

export default Home;
