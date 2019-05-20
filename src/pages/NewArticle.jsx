import React, { Component } from "react";
import { postArticle } from "../api.js";
import { navigate } from "@reach/router";

class NewArticle extends Component {
  state = {
    postbody: { title: null, body: null, username: null, topic: null },
    incompleteArticleForm: false
  };
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
      <div className="new-article">
        <h4>You are submitting a text post.</h4>
        <form onSubmit={this.submitArticle}>
          <div>
            <label id="new-article-title-label">
              Title:{" "}
              <input
                id="new-article-title-input"
                name="title"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Topic: <input name="topic" onChange={this.handleChange} />
            </label>
          </div>
          <p>Popular choices are: coding, football, cooking</p>
          <div>
            <label>
              Post: <textarea name="body" onChange={this.handleChange} />
            </label>
          </div>
          <button>Submit</button>
        </form>
        {this.state.incompleteArticleForm && (
          <p>
            All fields must be completed. Topic must pre-exist and user must be
            logged in.
          </p>
        )}
      </div>
    );
  }
  submitArticle = event => {
    event.preventDefault();
    postArticle(this.state.postbody)
      .then(article => {
        navigate(`/articles/${article.article_id}`, { state: { new: true } });
      })
      .catch(() => {
        this.setState({
          incompleteArticleForm: true
        });
      });
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      postbody: {
        ...this.state.postbody,
        [event.target.name]: event.target.value
      }
    });
  };

  addAuthorToState = ({ username }) => {
    this.setState({ postbody: { ...this.state.postbody, username: username } });
  };
}

export default NewArticle;
