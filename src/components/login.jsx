// @flow
import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { domain } from "./variables/variables";
import { users } from "./users/users";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      cookies: new Cookies()
    };
  }

  componentDidMount() {}

  // onLogin() {
  //   const { username, password } = this.state;

  //   axios({
  //     method: "post",
  //     url: `${domain}/login`,
  //     headers: { "Content-Type": "application/json" },
  //     data: {
  //       username: username,
  //       password: password
  //     }
  //   })
  //     .then(function(response) {
  //       console.log(response);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  onLogin() {
    const { username, password, cookies } = this.state;
    var user = users[username];

    if (user && user.password === password) {
      cookies.set("atlasofcloudusername", username, { path: "/" });
      this.setState({});
    } else {
      console.log("您不是註冊的會員");
    }
  }

  onLogout() {
    const { cookies } = this.state;
    cookies.remove("atlasofcloudusername", { path: "/" });
    this.setState({});
  }

  render() {
    const { username, password, cookies } = this.state;
    var name = cookies.get("atlasofcloudusername");

    return (
      <div className="login-container">
        <p>您現在登入的身分是：{`${name ? name : "尚未登入"}`}</p>
        <label>
          username
          <input
            value={username}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
          />
        </label>
        <label>
          password
          <input
            value={password}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
        </label>
        <button onClick={this.onLogin.bind(this)}>login</button>
        <button onClick={this.onLogout.bind(this)}>logout</button>
      </div>
    );
  }
}

export default Login;
