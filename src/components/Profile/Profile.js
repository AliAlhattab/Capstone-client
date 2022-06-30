import { Component } from "react";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Profile extends Component {

state = {
    user: null,
    failedAuth: false
}

componentDidMount(){
    const token = sessionStorage.getItem('token');
    
    if(!token) {
        this.setState({failedAuth: true});
        return;
    }

    axios
        .get('http://localhost:8080/auth/profile', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            this.setState({
                user: response.data
            });
        })
        .catch(() => {
            this.setState({
                failedAuth: true
            });
        })
}

  render() {
    if (this.state.failedAuth) {
        return (
            <div className="profile">
                    <p>You must be logged in to see this page. <NavLink to="/login">Log in</NavLink></p>
                </div>
        )
    }

    if (!this.state.user) {
        return (
            <div className="profile">
                <p>Loading...</p>
            </div>
        )
    }

    const { first_name, last_name, username, password} = this.state.user;


    return (
        <main className="profile">
            <h1 className="profile__title">Profile</h1>
            <p>
                Welcome back, {first_name} {last_name}! 👋
            </p>
            <h2>My Profile</h2>
            <p>Username: {username}</p>
            <p>Email: </p>
            <p>Phone: </p>

        </main>
    );
  }
}

export default Profile;
