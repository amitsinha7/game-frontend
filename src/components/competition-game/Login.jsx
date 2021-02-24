import React, { Component } from "react";
import ChallengeAPI, { JWT_TOKEN, USER_NAME_SESSION_ATTRIBUTE_NAME } from "../../api/ChallengeAPI";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginClicked() {
    ChallengeAPI.authenticateAPI(this.state.username, this.state.password)
      .then(response => {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, this.state.username);
        sessionStorage.setItem(JWT_TOKEN, "Bearer " + response.data.token);
        this.props.history.push(`/challenge`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  render() {
    return (
      <div className="row align-items-center">
        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <div className="form-group">
            <div className="row">
              <div className="col">
                <label htmlFor="username-register" className="text-muted mb-1">
                  <small>User Name</small>
                </label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" autoComplete="off" />
              </div>
              <div className="col">
                <label htmlFor="username-register" className="text-muted mb-1">
                  <small>Password</small>
                </label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" autoComplete="off" />
              </div>
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block" onClick={this.loginClicked}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
