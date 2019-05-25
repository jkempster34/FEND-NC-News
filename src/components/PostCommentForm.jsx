import React, { Component } from "react";
import { postComment } from "../api.js";

class PostCommentForm extends Component {
  state = { postbody: { username: "", body: "" } };
  componentDidMount() {
    this.addAuthorToState(this.props.loggedInUser);
  }
  componentDidUpdate(prevProps) {
    if (this.props.loggedInUser !== prevProps.loggedInUser) {
      this.addAuthorToState(this.props.loggedInUser);
    }
  }
  render() {
    return (
      this.props.loggedInUser && (
        <div id="post-comment">
          <form onSubmit={this.submitComment}>
            {" "}
            <textarea
              placeholder="add a public comment..."
              id="post-comment-text-area"
              name="body"
              value={`${this.state.postbody.body}`}
              onChange={this.handleChange}
            />
            <div>
              {" "}
              <button
                id="post-comment-submit-button"
                disabled={!this.state.postbody.body}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )
    );
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      postbody: {
        ...this.state.postbody,
        body: event.target.value
      }
    });
  };

  submitComment = event => {
    event.preventDefault();
    postComment(this.props.articleId, this.state.postbody).then(newComment => {
      this.setState({ postbody: { ...this.state.postbody, body: "" } });
      this.props.addNewComment(newComment);
    });
  };

  addAuthorToState = ({ username }) => {
    this.setState({ postbody: { ...this.state.postbody, username: username } });
  };
}

export default PostCommentForm;
