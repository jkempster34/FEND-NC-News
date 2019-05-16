import React, { Component } from "react";
import { getArticleById } from "../api.js";
import CommentsForArticle from "../components/CommentsForArticle.jsx";
import { patchArticle } from "../api.js";
import { navigate } from "@reach/router";

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
          votes: 0,
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
    console.log(this.state.article);
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
        VOTES: {article.votes + votes}
        BODY: {article.body}
        <div>
          <button
            disabled={votes === 1}
            onClick={() => {
              this.handleVote(1);
            }}
          >
            like
          </button>
          <button
            disabled={votes === -1}
            onClick={() => {
              this.handleVote(-1);
            }}
          >
            dislike
          </button>
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

  handleVote = direction => {
    patchArticle(this.props.article_id, { inc_votes: direction });
    this.setState(prevState => {
      const newVote = prevState.votes + direction;
      return {
        votes: newVote
      };
    });
  };

  changeCommentCount = num => {
    console.log(this.state.article);
    this.setState({ commentCount: +this.state.commentCount + num });
  };
}

export default SingleArticle;
