import React, { Component } from "react";
import { patchArticle, patchComment } from "../api.js";

class VoteButtons extends Component {
  state = {
    votes: 0
  };
  render() {
    const { votes } = this.state;
    return (
      <div>
        <button
          disabled={votes === 1}
          onClick={() => {
            this.handleVote(1);
          }}
        >
          like
        </button>
        VOTES: {this.props.votes + votes}
        <button
          disabled={votes === -1}
          onClick={() => {
            this.handleVote(-1);
          }}
        >
          dislike
        </button>
      </div>
    );
  }
  handleVote = direction => {
    if (this.props.type === "article") {
      patchArticle(this.props.articleId, { inc_votes: direction });
    } else if (this.props.type === "comment") {
      patchComment(this.props.commentId, { inc_votes: direction });
    }
    this.setState(prevState => {
      const newVote = prevState.votes + direction;
      return {
        votes: newVote
      };
    });
  };
}

export default VoteButtons;
