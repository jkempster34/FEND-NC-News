import React, { Component } from "react";
import { getArticles } from "../api.js";

class ArticlesList extends Component {
  state = {
    articles: null,
    loading: true
  };
  componentDidMount() {
    this.getArticlesBySort(this.props.sortBy);
  }
  componentDidUpdate = prevProps => {
    if (this.props.sortBy !== prevProps.sortBy) {
      this.getArticlesBySort(this.props.sortBy);
    }
  };
  render() {
    const { articles, loading } = this.state;
    return loading ? (
      <p>loading...</p>
    ) : (
      <ul>
        {articles.map(article => {
          return (
            <li key={article.article_id}>
              {article.title + "MAKE A LINK!!!!!!"}
              COMMENTS: {article.comment_count}
              AUTHOR : {article.author}
              CREATED_AT: {article.created_at}
              VOTES: {article.votes}
            </li>
          );
        })}
      </ul>
    );
  }
  getArticlesBySort = sortBy => {
    getArticles({ sort_by: sortBy }).then(articles => {
      this.setState({ articles, loading: false });
    });
  };
}

export default ArticlesList;
