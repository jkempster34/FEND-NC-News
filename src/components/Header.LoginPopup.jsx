import React, { Component } from "react";
import { EventEmitter } from "events";
import { getUser } from "../api.js";

class LoginPopup extends Component {
  state = {
    userNameInput: "",
    showLoginPopup: false
  };
  render() {
    return (
      <div className="login-popup">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} type="text" />
          <button>SIGN IN</button>
        </form>
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
    });
  };

  toggleLoginPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
}

export default LoginPopup;
