import React from "react";
import { Link } from "@reach/router";

const ArticlesList = props => {
  const { articles, loading } = props;
  return loading ? (
    <p>loading...</p>
  ) : (
    <ul>
      {articles.map(article => {
        return (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
            COMMENTS: {article.comment_count}
            AUTHOR : {article.author}
            CREATED_AT: {article.created_at}
            VOTES: {article.votes}
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
