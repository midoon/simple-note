import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.scss";
import Button from "../../../components/atoms/button";
import { loginUserAPI } from "../../../config/redux/action";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    // console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { history } = this.props;
    const { email, password } = this.state;
    const res = await this.props.loginAPI({ email, password }).catch((err) => err);
    if (res) {
      console.log("login berhasil", res);
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("login gagal");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
          <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
          <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
        </div>
        {/* <button>Go to Dashboard</button> */}
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDisppatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDisppatch)(withRouter(Login));
