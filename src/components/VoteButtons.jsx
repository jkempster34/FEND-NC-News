import React, { Component } from "react";
import { patchArticle } from "../api.js";

class voteButtons extends Component {
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
    patchArticle(this.props.articleId, { inc_votes: direction });
    this.setState(prevState => {
      const newVote = prevState.votes + direction;
      return {
        votes: newVote
      };
    });
  };
}

export default voteButtons;
