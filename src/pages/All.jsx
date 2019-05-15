import React, { Component } from "react";
import ArticlesList from "../components/ArticlesList";
import { getArticles } from "../api.js";
import PageNavigation from "../components/PageNavigation";

// go to football then keepo refreshing

class All extends Component {
  state = {
    sortBy: "created_at",
    articles: null,
    loading: true,
    p: 1,
    limit: 10,
    totalPages: 0,
    topic: ""
  };
  componentDidMount() {
    this.fetchArticles(this.state.sortBy, this.state.topic);
    this.setState({ topic: this.props.topic });
  }
  componentDidUpdate = (prevProps, prevState) => {
    console.log(
      prevState.sortBy,
      prevState.p,
      prevState.limit,
      prevState.topic
    );
    console.log(
      this.state.sortBy,
      this.state.p,
      this.state.limit,
      this.state.topic
    );
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.p !== prevState.p ||
      this.state.limit !== prevState.limit ||
      this.state.topic !== prevState.topic
    ) {
      console.log(this.state.topic, "hui");
      this.fetchArticles(
        this.state.sortBy,
        this.state.p,
        this.state.limit,
        this.state.topic
      );
    }
    if (this.props.location && this.props.location.state.refresh) {
      this.setState({
        limit: 10,
        p: 1,
        sortBy: "created_at"
      });
      this.props.location.state.refresh = false;
    }
    if (this.props.topic !== prevProps.topic) {
      this.setState({ topic: this.props.topic });
    }
  };
  render() {
    const {
      articles,
      loading,
      sortBy,
      totalPages,
      limit,
      p,
      topic
    } = this.state;
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
        <ArticlesList
          articles={articles}
          loading={loading}
          currentTopic={topic}
        />
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
  fetchArticles = (sortBy, page, limit, topic) => {
    console.log(topic, "topic4");
    getArticles({ sort_by: sortBy, p: page, limit: limit, topic: topic }).then(
      ({ articles, total_count }) => {
        console.log(topic, "<<----");
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
