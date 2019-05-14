import React, { Component } from "react";
import TopicsList from "../components/TopicsList.jsx";
import ArticlesList from "../components/ArticlesList.jsx";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <p>Home...</p>
        <h2>Popular Topics (no such thing, think of something else)</h2>
        <TopicsList />
        <h2>Popular Articles</h2>
        <ArticlesList sortBy="comment_count" />
      </div>
    );
  }
}

//move CDM and CDU and other stuff to here from articles list

export default Home;
