import React, { Component } from "react";
import { getUser } from "../api.js";

class LoginPopup extends Component {
  state = {
    userNameInput: "",
    wrongLogin: false
  };
  render() {
    return (
      <div className="login-popup">
        <div className="login-popup-inner" onKeyDown={this.handleEsc}>
          <div className="login-popup-header">
            <h1 id="login-title">LOGIN</h1>
            <button
              onClick={this.props.toggleLoginPopup}
              id="header-close-button"
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:{" "}
              <input
                autoFocus
                onChange={this.handleInput}
                type="text"
                placeholder="example: jessjelly"
              />
            </label>
            <button>SIGN IN</button>
          </form>

          {this.state.wrongLogin && <p>No user exists!</p>}
        </div>
      </div>
    );
  }
  handleEsc = event => {
    if (event.keyCode === 27) this.props.toggleLoginPopup();
  };

  handleInput = event => {
    this.setState({ userNameInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    getUser(this.state.userNameInput)
      .then(validUser => {
        this.props.loginUser(validUser);
      })
      .then(() => {
        this.props.toggleLoginPopup();
      })
      .catch(() => this.setState({ wrongLogin: true }));
  };
}

export default LoginPopup;
