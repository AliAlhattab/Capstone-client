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
        .get('http://localhost:8080/profile', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            this.setState({
                user: response.data
            });
            sessionStorage.setItem('user_id', response.data.id)
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

    const { first_name, last_name, username, email, phone} = this.state.user;


    return (
        <main className="profile">
            <h1 className="profile__title">Profile</h1>
            <p>
               {first_name} {last_name}
            </p>
            <h2>My Profile</h2>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone} </p>
            <h1>Posts</h1>
            {
                
            }

        </main>
    );
  }
}

export default Profile;
