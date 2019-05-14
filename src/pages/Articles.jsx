import React, { Component } from "react";
import ArticlesList from "../components/ArticlesList";
import { Link } from "@reach/router";

class Articles extends Component {
  state = {
    sort_by: "created_at"
  };
  render() {
    return (
      <div className="Articles">
        <p>Articles...</p>
        <Link to="/new-article">
          <button>ADD NEW ARTICLE</button>
        </Link>
        <select value={this.state.sort_by} onChange={this.handleChange}>
          <option value="created_at">Recent</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <ArticlesList sortBy={this.state.sort_by} />
      </div>
    );
  }
  handleChange = event => {
    this.setState({ sort_by: event.target.value });
  };
}

export default Articles;
