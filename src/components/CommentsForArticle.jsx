import React, { Component } from "react";
import { getCommentsByArticleId } from "../api.js";
import PostCommentForm from "../components/PostCommentForm.jsx";
import VoteButtons from "./VoteButtons.jsx";
import DeleteButton from "./DeleteButton.jsx";
import PageNavigation from "./PageNavigation.jsx";

class CommentsForArticle extends Component {
  state = {
    comments: [],
    loading: true,
    sortBy: "created_at",
    p: 1,
    limit: 10,
    newComment: false
  };
  componentDidMount = () => {
    this.repopulateList(
      this.props.articleId,
      this.state.sortBy,
      this.state.p,
      this.state.limit,
      0
    );
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.sortBy !== prevState.sortBy ||
      this.state.limit !== prevState.limit
    ) {
      this.setState({ p: 1 }, () => {
        this.repopulateList(
          this.props.articleId,
          this.state.sortBy,
          this.state.p,
          this.state.limit,
          0
        );
      });
    } else if (this.state.p !== prevState.p) {
      this.repopulateList(
        this.props.articleId,
        this.state.sortBy,
        this.state.p,
        this.state.limit,
        0
      );
    }
  };

  render() {
    const { comments, loading, sortBy, limit, p, newComment } = this.state;
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
        <select value={sortBy} onChange={this.handleSort}>
          <option value="created_at">Recent</option>
          <option value="votes">Votes</option>
        </select>
        <select value={limit} onChange={this.handleLimit}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={100}>100</option>
        </select>
        {newComment && <p>Here is your new comment</p>}
        <ul>
          {comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                BODY: {comment.body}
                AUTHOR : {comment.author}
                CREATED_AT: {comment.created_at}
                <VoteButtons
                  commentId={comment.comment_id}
                  votes={comment.votes}
                  type={"comment"}
                  loggedInUser={this.props.loggedInUser}
                  loginUser={this.props.loginUser}
                />
                {this.props.loggedInUser.username === comment.author && (
                  <DeleteButton
                    commentId={comment.comment_id}
                    repopulateList={this.repopulateList}
                    articleId={this.props.articleId}
                  />
                )}
              </li>
            );
          })}
        </ul>
        <PageNavigation
          changePage={this.changePage}
          totalPages={this.props.commentCount}
          currentPage={p}
          limit={limit}
        />
      </div>
    );
  }
  addNewComment = newComment => {
    this.setState({
      comments: [newComment, ...this.state.comments],
      newComment: true
    });
    this.props.changeCommentCount(1);
  };

  repopulateList = (articleId, sortBy, page, limit, num) => {
    getCommentsByArticleId(articleId, {
      sort_by: sortBy,
      p: page,
      limit: limit
    }).then(({ comments }) => {
      this.setState({ comments, loading: false });
    });
    this.props.changeCommentCount(num);
  };

  changePage = (pageNum, numButton) => {
    if (numButton) {
      this.setState(prevState => {
        return { p: pageNum };
      });
    } else {
      this.setState(prevState => {
        return { p: prevState.p + pageNum };
      });
    }
  };

  handleSort = event => {
    this.setState({ sortBy: event.target.value });
  };

  handleLimit = event => {
    this.setState({ limit: event.target.value });
  };
}

export default CommentsForArticle;
