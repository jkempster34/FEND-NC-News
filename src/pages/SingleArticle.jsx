import React, { Component } from "react";
import { getArticleById } from "../api.js";
import CommentsForArticle from "../components/CommentsForArticle.jsx";
import { navigate } from "@reach/router";
import VoteButtons from "../components/VoteButtons.jsx";
import { changeTimeToAgo } from "../utils/changeTimeToAgo.js";
import loadingGif from "../images/loading.gif";

class SingleArticle extends Component {
  state = {
    article: null,
    votes: 0,
    loading: true,
    buttonClicked: false,
    commentCount: 0
  };
  componentDidMount = () => {
    getArticleById(this.props.article_id)
      .then(article =>
        this.setState({
          article,
          loading: false,
          votes: article.votes,
          commentCount: article.comment_count
        })
      )
      .catch(({ response: { data, status } }) => {
        // console.log(data.msg, status);
        navigate("/not-found", {
          state: { from: "article", msg: data.msg, status },
          replace: true
        });
      });
  };
  render() {
    const { article, loading, votes } = this.state;
    const { loginUser } = this.props;
    const { state: locationState } = this.props.location;
    return loading ? (
      <img className="loading-gif" src={loadingGif} alt="loading..." />
    ) : (
      <div>
        <div id="article-full-article">
          <VoteButtons
            articleId={this.props.article_id}
            votes={votes}
            type={"article"}
            loginUser={loginUser}
            loggedInUser={this.props.loggedInUser}
          />
          <div>
            {" "}
            {locationState && locationState.new && (
              <h3 className="new-content-alert" id="new-article-alert">
                You have posted a new article
              </h3>
            )}
            <div className="article-full-article-title">{article.title}</div>
            <div>
              submitted {changeTimeToAgo(article.created_at)} by{" "}
              <span id="single-article-author">{article.author}</span>
            </div>
            <div>{this.state.commentCount} comments</div>
            <div id="article-full-article-body">{article.body}</div>
          </div>
        </div>
        <CommentsForArticle
          articleId={this.props.article_id}
          loggedInUser={this.props.loggedInUser}
          changeCommentCount={this.changeCommentCount}
          loginUser={loginUser}
          commentCount={this.state.commentCount}
        />
      </div>
    );
  }

  changeCommentCount = num => {
    this.setState({ commentCount: +this.state.commentCount + num });
  };
}

export default SingleArticle;
