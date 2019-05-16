import React, { Component } from "react";
import { getCommentsByArticleId, patchComment } from "../api.js";
import PostCommentForm from "../components/PostCommentForm.jsx";

////// adding votes to each comment, adding new component of voteButtons

class CommentsForArticle extends Component {
  state = {
    comments: null,
    loading: true,
    votes: 0
  };

  componentDidMount = () => {
    getCommentsByArticleId(this.props.articleId).then(comments => {
      this.setState({ comments, loading: false });
    });
  };
  render() {
    const { comments, loading, votes } = this.state;
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
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  addNewComment = newComment => {
    this.setState({ comments: [newComment, ...this.state.comments] });
    this.props.changeCommentCount(1);
  };
  handleVote = direction => {
    patchComment(this.props.article_id, { inc_votes: direction });
    this.setState(prevState => {
      const newVote = prevState.votes + direction;
      return {
        votes: newVote
      };
    });
  };
}

export default CommentsForArticle;
