import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Home from "./pages/Home.jsx";
import SingleArticle from "./pages/SingleArticle.jsx";
import NewArticle from "./pages/NewArticle.jsx";
import Header from "./components/Header.jsx";
import ShowError from "./pages/ShowError.jsx";
import { getTopics } from "./api.js";

class App extends Component {
  state = {
    loggedInUser: "",
    topics: []
  };
  componentDidMount() {
    if (
      localStorage.loggedInUser !== "" &&
      localStorage.loggedInUser !== undefined
    ) {
      const userInStorage = localStorage.getItem("loggedInUser");
      this.setState({ loggedInUser: JSON.parse(userInStorage) });
    }
    this.fetchTopics();
  }
  render() {
    return (
      <div className="App">
        <Header
          loginUser={this.loginUser}
          loggedInUser={this.state.loggedInUser}
          logOutUser={this.logOutUser}
          topics={this.state.topics}
        />
        <div className="main-body">
          <Router primary={false}>
            <Home
              path="/"
              loginUser={this.loginUser}
              loggedInUser={this.state.loggedInUser}
            />
            <Home
              path="/topic/:topic"
              loginUser={this.loginUser}
              loggedInUser={this.state.loggedInUser}
            />
            <SingleArticle
              path="/articles/:article_id"
              loggedInUser={this.state.loggedInUser}
              loginUser={this.loginUser}
            />
            <NewArticle
              path="/new-article"
              loggedInUser={this.state.loggedInUser}
            />
            <ShowError path="not-found" />
            <ShowError default />
          </Router>
        </div>
      </div>
    );
  }

  loginUser = user => {
    this.setState({ loggedInUser: user });
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  logOutUser = () => {
    this.setState({ loggedInUser: "" });
    localStorage.setItem("loggedInUser", "");
  };

  fetchTopics = () => {
    getTopics().then(topics => {
      const slugs = topics.map(topic => topic.slug);
      this.setState({ topics: slugs });
    });
  };
}

export default App;
