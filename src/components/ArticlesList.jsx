import React, { Component } from "react";
import { getArticles } from "../api.js";

class ArticlesList extends Component {
  state = {
    articles: null,
    loading: true
  };
  componentDidMount() {
    getArticles({ sort_by: "comment_count" }).then(articles => {
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
          return (
            <li key={article.article_id}>
              {article.title}
              COMMENTs: {article.comment_count}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ArticlesList;
