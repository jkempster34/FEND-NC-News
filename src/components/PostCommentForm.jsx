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
    console.log(this.props.loggedInUser, "<<<");
    return (
      <div>
        <form onSubmit={this.submitComment}>
          {" "}
          <textarea name="body" onChange={this.handleChange} />
          <button disabled={!this.state.postbody.body}>Submit</button>
        </form>
      </div>
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
      this.props.addNewComment(newComment);
    });
  };

  addAuthorToState = ({ username }) => {
    this.setState({ postbody: { ...this.state.postbody, username: username } });
  };
}

export default PostCommentForm;
