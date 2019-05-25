import React, { Component } from "react";
import { getUser } from "../api.js";
import loadingGif from "../images/loading.gif";

class LoginPopup extends Component {
  state = {
    userNameInput: "",
    wrongLogin: false,
    loading: false
  };
  render() {
    const { wrongLogin, loading } = this.state;

    return (
      <div className="login-popup">
        <div className="login-popup-inner" onKeyDown={this.handleEsc}>
          <div className="login-popup-header">
            <h3 id="login-title">LOGIN</h3>
            <button
              onClick={() => {
                this.props.toggleLoginPopup(false);
              }}
              id="header-close-button"
            />
          </div>
          <p id="login-popup-text">
            You can login with one of our users such as{" "}
            <strong>jessjelly</strong>, <strong>happyamy2016</strong>, or{" "}
            <strong>weegembump</strong>. Once logged in, NC News will remember
            who you are in case you visit again.
          </p>

          {loading ? (
            <img src={loadingGif} alt="loading..." />
          ) : (
            <form onSubmit={this.handleSubmit}>
              <label id="login-popup-username-label">
                Username
                <input
                  id="login-popup-username-input"
                  autoFocus
                  onChange={this.handleInput}
                  type="text"
                  placeholder="example: jessjelly"
                  required
                />
              </label>

              <button id="login-popup-signin-button">Log in</button>
              {wrongLogin && (
                <p id="login-popup-no-user-exists">Incorrect username</p>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }
  handleEsc = event => {
    if (event.keyCode === 27) this.props.toggleLoginPopup(false);
  };

  handleInput = event => {
    this.setState({ userNameInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true }, () => {
      getUser(this.state.userNameInput)
        .then(validUser => {
          this.props.loginUser(validUser);
        })
        .then(() => {
          this.setState({ loading: false }, () => {
            this.props.toggleLoginPopup(false);
          });
        })
        .catch(() => this.setState({ wrongLogin: true, loading: false }));
    });
  };
}

export default LoginPopup;
