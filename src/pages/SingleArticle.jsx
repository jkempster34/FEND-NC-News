import React, { Component } from "react";
import { getArticleById } from "../api.js";
import CommentsForArticle from "../components/CommentsForArticle.jsx";
import { patchArticle } from "../api.js";

class SingleArticle extends Component {
  state = {
    article: null,
    votes: 0,
    loading: true,
    buttonClicked: false
  };
  componentDidMount = () => {
    getArticleById(this.props.article_id).then(article =>
      this.setState({ article, loading: false, votes: article.votes })
    );
  };
  render() {
    const { article, loading, votes } = this.state;
    const { state: locationState } = this.props.location;
    return loading ? (
      <p>loading...</p>
    ) : (
      <div>
        {locationState && locationState.new && <p>Here, is your article:</p>}
        COMMENTS: {article.comment_count}
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
        <CommentsForArticle articleId={this.props.article_id} />
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
}

export default SingleArticle;
