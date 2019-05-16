import React, { Component } from "react";
import { getCommentsByArticleId } from "../api.js";
import PostCommentForm from "../components/PostCommentForm.jsx";

class CommentsForArticle extends Component {
  state = {
    comments: null,
    loading: true
  };

  componentDidMount = () => {
    getCommentsByArticleId(this.props.articleId).then(comments => {
      this.setState({ comments, loading: false });
    });
  };
  render() {
    const { comments, loading } = this.state;
    return loading ? (
      <p>loading...</p>
    ) : (
      <div>
        {" "}
        <PostCommentForm
          loggedInUser={this.props.loggedInUser}
          articleId={this.props.articleId}
          addNewComment={this.addNewComment}
        />
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                body: {comment.body}
                AUTHOR : {comment.author}
                CREATED_AT: {comment.created_at}
                VOTES: {comment.votes}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  addNewComment = newComment => {
    this.setState({ comments: [newComment, ...this.state.comments] });
  };
}

export default CommentsForArticle;
