import React from "react";
import { Link } from "@reach/router";
import { changeTimeToAgo } from "../utils/changeTimeToAgo.js";
import VoteButtons from "../components/VoteButtons.jsx";

const ArticlesList = props => {
  const { articles, loading } = props;

  return loading ? (
    <p>loading...</p>
  ) : (
    <ul className="articles-list">
      {articles.map(article => {
        return (
          <li className="articles-list-element" key={article.article_id}>
            <VoteButtons
              articleId={article.article_id}
              votes={article.votes}
              type={"article"}
              loginUser={props.loginUser}
              loggedInUser={props.loggedInUser}
            />
            <span>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
              <div>
                {" "}
                COMMENTS: {article.comment_count}
                AUTHOR : {article.author}
                CREATED_AT: {changeTimeToAgo(article.created_at)}
              </div>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
