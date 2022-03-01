import React, { Component } from "react";

import "./register.scss";
import Button from "../../../components/atoms/button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";
import { withRouter } from "react-router-dom";

// import firebaseApp from "../../../config/firebase";

class Register extends Component {
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

  handleRegisterSubmit = async () => {
    console.log(this.state.email);
    console.log(this.state.password);

    const { history } = this.props;

    const { email, password } = this.state;
    const res = await this.props.registerAPI({ email, password }).catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
      console.log("register succes");
      history.push("/");
    } else {
      console.log("register failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
          <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
          <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
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
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDisppatch)(withRouter(Register));
