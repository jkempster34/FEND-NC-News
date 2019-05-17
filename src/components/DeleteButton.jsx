import React, { Component } from "react";
import { deleteComment } from "../api.js";

class DeleteButton extends Component {
  render() {
    return <button onClick={this.removeComment}>Delete</button>;
  }
  removeComment = () => {
    deleteComment(this.props.commentId).then(() => {
      this.props.repopulateList(this.props.articleId, "created_at", 1, 10, -1);
    });
  };
}

export default DeleteButton;
