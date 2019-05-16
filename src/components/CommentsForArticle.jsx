import React, { Component } from "react";
import { getCommentsByArticleId } from "../api.js";
import PostCommentForm from "../components/PostCommentForm.jsx";
import VoteButtons from "./VoteButtons.jsx";
import DeleteButton from "./DeleteButton.jsx";

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
                <VoteButtons
                  commentId={comment.comment_id}
                  votes={comment.votes}
                  type={"comment"}
                />
                <DeleteButton
                  commentId={comment.comment_id}
                  repopulateList={this.repopulateList}
                  articleId={this.props.articleId}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  addNewComment = newComment => {
    this.setState({ comments: [newComment, ...this.state.comments] });
    console.log(this.state.comments.length);
    this.props.changeCommentCount(1);
  };
  repopulateList = articleId => {
    getCommentsByArticleId(this.props.articleId).then(comments => {
      this.setState({ comments, loading: false });
    });
  };
}

export default CommentsForArticle;
