import React, { Component } from "react";
import { getArticles } from "../api.js";

class ArticlesList extends Component {
  state = {
    articles: null,
    loading: true
  };
  componentDidMount() {
    getArticles().then(articles => {
      this.setState({ articles, loading: false });
    });
  }
  render() {
    const { articles, loading } = this.state;
    return loading ? (
      <p>loading...</p>
    ) : (
      <ul>
        {articles.map(article => {
          return <li key={article.article_id}>{article.title}</li>;
        })}
      </ul>
    );
  }
}

export default ArticlesList;
