import React from "react";
import { Link } from "@reach/router";
import { changeTimeToAgo } from "../utils/changeTimeToAgo.js";
import VoteButtons from "../components/VoteButtons.jsx";
import loadingGif from "../images/loading.gif";

const ArticlesList = props => {
  const { articles, loading } = props;

  return loading ? (
    <img className="loading-gif" src={loadingGif} alt="loading..." />
  ) : (
    <ul className="content-list">
      {articles.map((article, index) => {
        return (
          <li
            className={`content-list-element${
              index % 2 === 0 ? "-even" : "-odd"
            }`}
            key={article.article_id}
          >
            <VoteButtons
              articleId={article.article_id}
              votes={article.votes}
              type={"article"}
              loginUser={props.loginUser}
              loggedInUser={props.loggedInUser}
            />
            <div className="article-body">
              <span className="article-full-article-text">
                <Link
                  className="article-full-article-title"
                  id="article-full-article-link"
                  to={`/articles/${article.article_id}`}
                >
                  {article.title}
                </Link>
              </span>
              <span className="article-middle-section">
                {" "}
                submitted {changeTimeToAgo(article.created_at)} by{" "}
                {article.author} to{" "}
                <Link
                  className="article-topic-link"
                  to={`/topic/${article.topic}`}
                  key={article.topic + index}
                >
                  <span>{article.topic}</span>
                </Link>
              </span>
              <span>
                <Link
                  className="article-comment-link"
                  to={`/articles/${article.article_id}`}
                  key={article.topic + index}
                >
                  {article.comment_count} comments
                </Link>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
