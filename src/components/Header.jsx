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
            <Link id="header-new-article-button" to="/new-article">
              <button>ADD NEW ARTICLE</button>
            </Link>
          ) : (
            <button onClick={this.toggleLoginPopup}>ADD NEW ARTICLE</button>
          )}
          {loggedInUser && <CurrentUserDisplay loggedInUser={loggedInUser} />}
          <button
            id="header-sign-in-button"
            onClick={loggedInUser ? this.handleLogOut : this.toggleLoginPopup}
          >{`${loggedInUser ? "SIGN OUT" : "SIGN IN"}`}</button>
          {showLoginPopup && (
            <LoginPopup
              loginUser={loginUser}
              toggleLoginPopup={this.toggleLoginPopup}
            />
          )}
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
