import React, { Component } from "react";
import ArticlesList from "../components/ArticlesList";
import { getArticles } from "../api.js";
import { Link } from "@reach/router";

class All extends Component {
  state = {
    sortBy: "created_at",
    articles: null,
    loading: true
  };
  componentDidMount() {
    this.getArticlesBySort(this.state.sortBy);
  }
  //// check this is okay??
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.sortBy !== prevState.sortBy) {
      this.getArticlesBySort(this.state.sortBy);
    }
  };
  render() {
    const { articles, loading, sortBy } = this.state;
    return (
      <div className="Articles">
        <p>Articles...</p>
        <Link to="/new-article">
          <button>ADD NEW ARTICLE</button>
        </Link>
        <select value={sortBy} onChange={this.handleChange}>
          <option value="created_at">Recent</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <ArticlesList articles={articles} loading={loading} />
      </div>
    );
  }
  handleChange = event => {
    this.setState({ sortBy: event.target.value });
  };
  getArticlesBySort = sortBy => {
    getArticles({ sort_by: sortBy }).then(articles => {
      this.setState({ articles, loading: false });
    });
  };
}

export default All;
