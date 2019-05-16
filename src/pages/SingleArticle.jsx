import React, { Component } from "react";
import { getArticleById } from "../api.js";
import CommentsForArticle from "../components/CommentsForArticle.jsx";

import { navigate } from "@reach/router";
import VoteButtons from "../components/VoteButtons.jsx";

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
        console.log(data.msg, status);
        navigate("/not-found", {
          state: { from: "article", msg: data.msg, status },
          replace: true
        });
      });
  };
  render() {
    const { article, loading, votes } = this.state;
    const { state: locationState } = this.props.location;
    return loading ? (
      <p>loading...</p>
    ) : (
      <div>
        {locationState && locationState.new && <p>Here, is your article:</p>}
        COMMENTS: {this.state.commentCount}
        AUTHOR : {article.author}
        CREATED_AT: {article.created_at}
        BODY: {article.body}
        <div>
          <VoteButtons
            articleId={this.props.article_id}
            votes={votes}
            type={"article"}
          />
        </div>
        <p>....</p>
        <h4>Comments</h4>
        <CommentsForArticle
          articleId={this.props.article_id}
          loggedInUser={this.props.loggedInUser}
          changeCommentCount={this.changeCommentCount}
        />
      </div>
    );
  }

  changeCommentCount = num => {
    this.setState({ commentCount: +this.state.commentCount + num });
  };
}

export default SingleArticle;
