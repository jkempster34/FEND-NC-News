import React, { Component } from "react";
import { patchArticle, patchComment } from "../api.js";
import LoginPopup from "./Header.LoginPopup.jsx";
import upVote from "../images/upvote.png";
import upVoteClicked from "../images/upvote-clicked.png";
import downVote from "../images/downvote.png";
import downVoteClicked from "../images/downvote-clicked.png";

class VoteButtons extends Component {
  state = {
    votes: 0,
    showLoginPopup: false
  };
  render() {
    const { loggedInUser, loginUser } = this.props;
    const { votes, showLoginPopup } = this.state;
    return (
      <div className="vote-buttons">
        <button
          className="top-vote-button"
          disabled={votes === 1}
          onClick={
            loggedInUser
              ? () => {
                  this.handleVote(1);
                  this.setState({ clickedDown: false });
                }
              : () => {
                  this.setState({ showLoginPopup: true });
                }
          }
        >
          <img
            className="vote-buttons-img"
            src={votes === 1 ? upVoteClicked : upVote}
            alt="up vote"
          />
        </button>
        <div> {this.props.votes + votes}</div>

        <button
          className="bottom-vote-button"
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
          <img
            className="vote-buttons-img"
            src={votes === -1 ? downVoteClicked : downVote}
            alt="down vote"
          />
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

  toggleLoginPopup = status => {
    this.setState({
      showLoginPopup: status
    });
  };
}

export default VoteButtons;
