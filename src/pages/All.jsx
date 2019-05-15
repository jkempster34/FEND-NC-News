import React, { Component } from "react";
import ArticlesList from "../components/ArticlesList";
import { getArticles } from "../api.js";
import PageNavigation from "../components/PageNavigation";

class All extends Component {
  state = {
    sortBy: "created_at",
    articles: null,
    loading: true,
    p: 1,
    limit: 10,
    totalPages: 0
  };
  componentDidMount() {
    this.fetchArticles(this.state.sortBy);
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.p !== prevState.p ||
      this.state.limit !== prevState.limit
    ) {
      this.fetchArticles(this.state.sortBy, this.state.p, this.state.limit);
    }
  };
  render() {
    console.log(this.props, "<<<<<<<<");
    const { articles, loading, sortBy, totalPages, limit, p } = this.state;
    return (
      <div className="Articles">
        <p>Articles...</p>
        <select value={sortBy} onChange={this.handleSort}>
          <option value="created_at">Recent</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        <select value={limit} onChange={this.handleLimit}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
        <ArticlesList articles={articles} loading={loading} />
        <PageNavigation
          changePage={this.changePage}
          totalPages={totalPages}
          currentPage={p}
          limit={limit}
        />
      </div>
    );
  }
  handleSort = event => {
    this.setState({ sortBy: event.target.value });
  };
  handleLimit = event => {
    this.setState({ limit: event.target.value });
  };
  fetchArticles = (sortBy, page, limit) => {
    getArticles({ sort_by: sortBy, p: page, limit: limit }).then(
      ({ articles, total_count }) => {
        this.setState({ articles, loading: false, totalPages: total_count });
      }
    );
  };
  changePage = (pageNum, numButton) => {
    if (numButton) {
      this.setState(prevState => {
        return { p: pageNum };
      });
    } else {
      this.setState(prevState => {
        return { p: prevState.p + pageNum };
      });
    }
  };
}

export default All;
