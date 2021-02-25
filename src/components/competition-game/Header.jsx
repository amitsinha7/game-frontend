import React, { Component } from "react";
import { Link } from "react-router-dom";
import ChallengeAPI from "../../api/ChallengeAPI";

class Header extends Component {
  render() {
    const isUserLoggedIn = ChallengeAPI.isUserLoggedIn();
    return (
      <header className="header-bar bg-primary mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-white">
              COGNIZANT CHALLENGE
            </Link>
          </h4>
          {isUserLoggedIn && (
            <div class="col-md-auto">
              <Link className="btn btn-success btn-sm" to="/challenge">
                SOLVE
              </Link>
            </div>
          )}
          {isUserLoggedIn && (
            <div class="col-md-auto">
              <Link className="btn btn-success btn-sm" to="/topplayer">
                TOP 3
              </Link>
            </div>
          )}
          {isUserLoggedIn && (
            <div class="col-md-auto">
              <Link className="btn btn-success btn-sm" to="/logout" onClick={ChallengeAPI.logout}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
