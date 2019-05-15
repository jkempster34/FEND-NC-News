import React, { Component } from "react";
import { Link } from "@reach/router";
import ncNewsLogo from "../images/nc-news-logo.png";
import LoginPopup from "./Header.LoginPopup.jsx";
import CurrentUserDisplay from "./Header.CurrentUserDisplay.jsx";

class Header extends Component {
  state = { showLoginPopup: false };
  render() {
    const { loggedInUser, loginUser } = this.props;
    const { showLoginPopup } = this.state;
    return (
      <div className="Header">
        <Link to="/" state={{ refresh: true }}>
          <img src={ncNewsLogo} alt="NC News logo" id="header-logo" />
        </Link>
        <Link to="/" state={{ refresh: true }}>
          All
        </Link>
        <Link to="/topics">Topics</Link>
        <Link to="/new-article">
          <button>ADD NEW ARTICLE</button>
        </Link>
        <button
          onClick={loggedInUser ? this.handleLogOut : this.toggleLoginPopup}
        >{`${loggedInUser ? "SIGN OUT" : "SIGN IN"}`}</button>
        {showLoginPopup && (
          <LoginPopup
            loginUser={loginUser}
            toggleLoginPopup={this.toggleLoginPopup}
          />
        )}
        {loggedInUser && <CurrentUserDisplay loggedInUser={loggedInUser} />}
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
