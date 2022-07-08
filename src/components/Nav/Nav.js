import { Component } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Nav extends Component {
  state = {
    failedAuth: false,
    user: null,
    id: sessionStorage.getItem('user_id')
  };


  componentDidMount() {
    const token = sessionStorage.getItem("token");
    

    if (!token) {
      this.setState({ failedAuth: true });
      return;
    }

    axios
      .get("http://localhost:8080/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch(() => {
        this.setState({
          failedAuth: true,
        });
      });
  }



  render() {
    if (this.state.failedAuth) {
      return (
        <nav className="nav">
          <NavLink className="nav__links" to="/">
            <h1 className="nav__title">WeDevelop</h1>
          </NavLink>
          <ul className="nav__list">
            <NavLink className="nav__links" to="/signup">
              <li className="nav__options">Sign Up</li>
            </NavLink>
            <NavLink className="nav__links" to="/login">
              <li className="nav__options">Login</li>
            </NavLink>
          </ul>
        </nav>
      );
    }

    if (!this.state.user) {
      return (
          <div>
              <p>Loading...</p>
          </div>
      )
  }

    return (
      <nav className="nav">
        <NavLink className="nav__links" to="/">
          <h1 className="nav__title">WeDevelop</h1>
        </NavLink>
        <ul className="nav__list">
          <NavLink className="nav__links" to={`/profile/`}>
            <li className="nav__options">Profile</li>
          </NavLink>
          <NavLink className="nav__links" to="/posts">
            <li className="nav__options">Posts</li>
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default Nav;
