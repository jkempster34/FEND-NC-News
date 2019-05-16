import React, { Component } from "react";
import { deleteComment } from "../api.js";

class DeleteButton extends Component {
  render() {
    return <button onClick={this.removeComment}>Delete</button>;
  }
  removeComment = () => {
    deleteComment(this.props.commentId);
    this.props.removeCommentFromList(this.props.commentId);
  };
}

export default DeleteButton;
