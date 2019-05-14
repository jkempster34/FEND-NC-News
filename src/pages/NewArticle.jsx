import React, { Component } from "react";

class NewArticle extends Component {
  state = {
    title: null,
    body: null,
    author: null,
    topic: null
  };
  render() {
    return (
      <div>
        <p>New article page!</p>
        <form onSubmit={this.submitArticle}>
          <input name="topic" onChange={this.handleChange} />

          <textarea />
          <button>SUBMIT</button>
        </form>
      </div>
    );
  }
  submitArticle = event => {
    event.preventDefault();
    console.log("joe");
  };

  handleChange(event) {
    console.log(event.target.value);
    console.log(event.target.name);
    // this.setState({ : event.target.value });
  }
}

export default NewArticle;
