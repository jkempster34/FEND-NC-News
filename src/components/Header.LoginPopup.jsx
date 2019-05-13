import React, { Component } from "react";
import { getUser } from "../api.js";

class LoginPopup extends Component {
  state = {
    userNameInput: ""
  };
  render() {
    return (
      <div className="login-popup">
        <div className="login-popup-inner">
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:{" "}
              <input
                onChange={this.handleInput}
                type="text"
                placeholder="example: jessjelly"
              />
            </label>

            <button>SIGN IN</button>
            <button onClick={this.props.toggleLoginPopup}>close</button>
          </form>
        </div>
      </div>
    );
  }

  handleInput = event => {
    this.setState({ userNameInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    getUser(this.state.userNameInput).then(validUser => {
      this.props.loginUser(validUser);
      this.props.toggleLoginPopup();
    });
  };
}

export default LoginPopup;
