import { Component } from "react";
import "./Login.scss";
import axios from 'axios'
import { NavLink, Redirect } from "react-router-dom";

class Login extends Component {

    state = {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
        success: false,
        error: ''
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = (e) => {
      e.preventDefault();

      if(!this.state.username){
        this.setState({usernameError: true})
    }

    if(!this.state.password){
        this.setState({passwordError: true})
    } 
    else {
      axios
        .post('http://localhost:8080/auth/login',{
          username: this.state.username,
          password: this.state.password
        })
        .then((response) => {
          this.setState({ success: true, error: ''});
          e.target.reset();
      })
      .catch((err) => {
          this.setState({ success: false, error: err.response.data });
      });
    }
    }


  render() {
    return (
      <section className="login">
        <h1 className="login__title">Login</h1>
        <form className="login__form" onSubmit={this.login}>

          <label className="login__label">Username</label>
          <input className="login__input" 
          onChange={this.changeHandler}
          id='username'
          name="username"
          type='text'
          placeholder="Username"
          
          />

          <label className="login__label">Password</label>
          <input className="login__input" 
          onChange={this.changeHandler}
          id='password'
          name="password"
          type='password'
          placeholder="Password"
          />

          <button className="login__button">Login</button>

          {this.state.error && <div className="login__message">{this.state.error}</div>}
          {this.state.success && <Redirect to="/" />}
        </form>
        <p>Need an account? <NavLink to="/signup">Sign up</NavLink></p>
      </section>
    );
  }
}

export default Login;
