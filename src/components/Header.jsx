import React, { Component } from "react";
import { Link } from "@reach/router";
import ncNewsLogo from "../images/nc-news-logo.png";
import LoginPopup from "./Header.LoginPopup";

class Header extends Component {
  state = { showLoginPopup: false };
  render() {
    return (
      <div className="Header">
        <Link to="/">
          <img src={ncNewsLogo} alt="NC News logo" id="header-logo" />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/articles">All</Link>
        <button
          onClick={
            this.props.loggedInUser ? this.handleLogOut : this.toggleLoginPopup
          }
        >{`${this.props.loggedInUser ? "SIGN OUT" : "SIGN IN"}`}</button>
        {this.state.showLoginPopup && (
          <LoginPopup
            loginUser={this.props.loginUser}
            toggleLoginPopup={this.toggleLoginPopup}
          />
        )}
      </div>
    );
  }

  toggleLoginPopup = () => {
    this.setState({
      showLoginPopup: !this.state.showLoginPopup
    });
  };

  handleLogOut = () => {
    this.props.logOutUser();
  };
}

export default Header;
