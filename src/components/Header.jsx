import React, { Component } from "react";
import { Link } from "@reach/router";
import ncNewsLogo from "../images/nc-news-logo.png";
import ncNewsLogoSmall from "../images/nc-news-logo-small.png";
import LoginPopup from "./Header.LoginPopup.jsx";
import CurrentUserDisplay from "./Header.CurrentUserDisplay.jsx";

class Header extends Component {
  state = { showLoginPopup: false };
  render() {
    const { loggedInUser, loginUser, topics } = this.props;
    const { showLoginPopup } = this.state;
    return (
      <div className="header">
        <div className="header-topic-bar">
          <Link
            id="all-topic"
            className="header-topics"
            to="/"
            state={{ refresh: true }}
          >
            all
          </Link>
          {topics.map(topic => (
            <Link className="header-topics" to={`/${topic}`} key={topic}>
              <span>{topic}</span>
            </Link>
          ))}
        </div>
        <div className="header-main-content">
          <Link id="header-logo-link" to="/" state={{ refresh: true }}>
            <img src={ncNewsLogo} alt="NC News logo" id="header-logo" />
          </Link>
          <Link id="header-logo-link-small" to="/" state={{ refresh: true }}>
            <img
              src={ncNewsLogoSmall}
              alt="NC News logo"
              id="header-logo-small"
            />
          </Link>
          {loggedInUser ? (
            <Link to="/new-article" id="header-new-article-button-link">
              add new article
            </Link>
          ) : (
            <button
              id="header-new-article-button-link"
              onClick={this.toggleLoginPopup}
            >
              add new article
            </button>
          )}
          {loggedInUser ? (
            <Link to="/new-article" id="header-new-article-button-link-small">
              add
            </Link>
          ) : (
            <button
              id="header-new-article-button-link-small"
              onClick={this.toggleLoginPopup}
            >
              add
            </button>
          )}
          <div
            id={`${
              loggedInUser
                ? "header-user-display"
                : "header-user-display-logged-out"
            }`}
          >
            {loggedInUser ? (
              <CurrentUserDisplay loggedInUser={loggedInUser} />
            ) : (
              <span id="header-want-to-contribute">want to contribute? </span>
            )}
            <span
              id={`${
                loggedInUser ? "header-log-out-button" : "header-log-in-button"
              }`}
              onClick={loggedInUser ? this.handleLogOut : this.toggleLoginPopup}
            >{`${loggedInUser ? "log out" : "log in"}`}</span>
            {showLoginPopup && (
              <LoginPopup
                loginUser={loginUser}
                toggleLoginPopup={this.toggleLoginPopup}
              />
            )}
          </div>
        </div>
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
