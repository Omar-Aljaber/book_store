import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Books from "./views/Books";
import "./style/index.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/books/category=:category&publisher=:publisher">
          <Books />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
