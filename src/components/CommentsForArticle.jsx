import React, { Component } from "react";
import { getCommentsByArticleId } from "../api.js";
import PostCommentForm from "../components/PostCommentForm.jsx";
import VoteButtons from "./VoteButtons.jsx";
import DeleteButton from "./DeleteButton.jsx";
import PageNavigation from "./PageNavigation.jsx";
import { changeTimeToAgo } from "../utils/changeTimeToAgo.js";
import loadingGif from "../images/loading.gif";

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
      <img className="loading-gif" src={loadingGif} alt="loading..." />
    ) : (
      <div>
        {" "}
        <PostCommentForm
          loggedInUser={this.props.loggedInUser}
          articleId={this.props.articleId}
          addNewComment={this.addNewComment}
        />
        <div className="comments-select-boxes">
          <label className="comments-sort-by-labels">sort by </label>
          <select value={sortBy} onChange={this.handleSort}>
            <option value="created_at">Recent</option>
            <option value="votes">Votes</option>
          </select>{" "}
          <label className="comments-sort-by-labels">show </label>
          <select value={limit} onChange={this.handleLimit}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={100}>100</option>
          </select>
        </div>
        {newComment && (
          <h3 className="new-content-alert">You have posted a new comment</h3>
        )}
        <ul className="content-list">
          {comments.map((comment, index) => {
            return (
              <li
                className={`content-list-element${
                  index % 2 === 0 ? "-even" : "-odd"
                }`}
                key={comment.comment_id}
              >
                <VoteButtons
                  commentId={comment.comment_id}
                  votes={comment.votes}
                  type={"comment"}
                  loggedInUser={this.props.loggedInUser}
                  loginUser={this.props.loginUser}
                />

                <div id="comment-list-comment">
                  <span id="comment-list-author">{comment.author}</span>{" "}
                  {changeTimeToAgo(comment.created_at)}
                  <div id="comment-list-body">{comment.body}</div>
                  {this.props.loggedInUser.username === comment.author && (
                    <DeleteButton
                      commentId={comment.comment_id}
                      repopulateList={this.repopulateList}
                      articleId={this.props.articleId}
                    />
                  )}
                </div>
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
