import { Component } from "react";
import "./Signup.scss";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    first_nameError: false,
    last_nameError: false,
    usernameError: false,
    passwordError: false,
    success: false,
    error: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = (e) => {
    e.preventDefault();

    if (!this.state.first_name) {
      this.setState({ first_nameError: true });
    }

    if (!this.state.last_name) {
      this.setState({ last_nameError: true });
    }

    if (!this.state.username) {
      this.setState({ usernameError: true });
    }

    if (!this.state.password) {
      this.setState({ passwordError: true });
    } else {
      axios
        .post("http://localhost:8080/auth/signup", {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          username: this.state.username,
          password: this.state.password,
        })
        .then((response) => {
          this.setState({ success: true, error: "" });
          e.target.reset();
        })
        .catch((err) => {
          this.setState({ success: false, error: err.response.data });
        });
    }
  };

  render() {
    return (
      <section className="signup">
        <div className="signup__container">
          <h1 className="signup__title">Sign Up</h1>
          <form className="signup__form" onSubmit={this.register}>
            <label className="signup__label">First Name</label>
            <input
              className={`signup__input ${
                this.state.first_nameError ? "signup__input-error" : ""
              }`}
              onChange={this.changeHandler}
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
            />

            <label className="signup__label">Last Name</label>
            <input
              className={`signup__input ${
                this.state.last_nameError ? "signup__input-error" : ""
              }`}
              onChange={this.changeHandler}
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
            />

            <label className="signup__label">Username</label>
            <input
              className={`signup__input ${
                this.state.usernameError ? "signup__input-error" : ""
              }`}
              onChange={this.changeHandler}
              id="username"
              name="username"
              type="text"
              placeholder="Username"
            />

            <label className="signup__label">Password</label>
            <input
              className={`signup__input ${
                this.state.passwordError ? "signup__input-error" : ""
              }`}
              onChange={this.changeHandler}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <button className="signup__button">Sign up</button>

            {this.state.success && <Redirect to="/login" />}
            {this.state.error && (
              <div className="signup__message">{this.state.error}</div>
            )}
          </form>

          <p className="signup__login">
            Have an account? <NavLink to="/login">Log in</NavLink>
          </p>
        </div>
      </section>
    );
  }
}

export default Signup;
