import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="border-top text-center small text-muted py-3 footer-align">
        <p className="m-0">
          Copyright &copy; 2020{" "}
          <a href="/" className="text-muted">
            Cognizant Challenge
          </a>
          . All rights reserved.
        </p>
      </footer>
    );
  }
}

export default Footer;
