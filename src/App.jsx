import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import All from "./pages/All.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";
import NewArticle from "./pages/NewArticle.jsx";
import Header from "./components/Header.jsx";
import NotFound from "./pages/NotFound.jsx";
import { getTopics } from "./api.js";

class App extends Component {
  state = {
    loggedInUser: "",
    topics: ""
  };
  componentDidMount() {
    this.fetchTopics();
  }
  render() {
    return (
      <div className="App">
        <Header
          loginUser={this.loginUser}
          loggedInUser={this.state.loggedInUser}
          logOutUser={this.logOutUser}
          fetchTopics={this.fetchTopics}
        />
        <Router>
          <All path="/" />
          <SingleArticle path="/articles/:article_id" />
          <NewArticle
            path="/new-article"
            loggedInUser={this.state.loggedInUser}
          />
          <NotFound default />
        </Router>
      </div>
    );
  }

  loginUser = username => {
    this.setState({ loggedInUser: username });
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "" });
  };

  fetchTopics = () => {
    getTopics().then(topics => {
      this.setState({ topics: topics.slug });
    });
  };
}

export default App;
