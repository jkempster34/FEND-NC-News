import React, { Component } from "react";
import { patchArticle, patchComment } from "../api.js";
import LoginPopup from "./Header.LoginPopup.jsx";

class VoteButtons extends Component {
  state = {
    votes: 0,
    showLoginPopup: false
  };
  render() {
    const { loggedInUser, loginUser } = this.props;
    const { votes, showLoginPopup } = this.state;
    return (
      <div>
        <button
          disabled={votes === 1}
          onClick={
            loggedInUser
              ? () => {
                  this.handleVote(1);
                }
              : () => {
                  this.setState({ showLoginPopup: true });
                }
          }
        >
          like
        </button>
        VOTES: {this.props.votes + votes}
        <button
          disabled={votes === -1}
          onClick={
            loggedInUser
              ? () => {
                  this.handleVote(-1);
                }
              : () => {
                  this.setState({ showLoginPopup: true });
                }
          }
        >
          dislike
        </button>
        {showLoginPopup && (
          <LoginPopup
            toggleLoginPopup={this.toggleLoginPopup}
            loginUser={loginUser}
          />
        )}
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

  toggleLoginPopup = () => {
    this.setState({
      showLoginPopup: !this.state.showLoginPopup
    });
  };
}

export default VoteButtons;
