import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import "./App.css";
import Home from "./pages/Home";
import Articles from "./pages/Articles.jsx";
import Header from "./components/Header.jsx";
import NotFound from "./pages/NotFound.jsx";

class App extends Component {
  state = {
    loggedInUser: ""
  };
  render() {
    return (
      <div className="App">
        <Header loginUser={this.loginUser} />
        <Router>
          <Home path="/" />
          <Articles path="/articles" />
          <NotFound default />
        </Router>
      </div>
    );
  }
  loginUser = username => {
    this.setState({ loggedInUser: username });
  };
}

export default App;
