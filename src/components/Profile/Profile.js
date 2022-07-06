import { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import picture from "../../assets/images/default_picture.jpg";
import './Profile.scss'
import CreatePost from "../CreatePost/CreatePost";

class Profile extends Component {
  state = {
    posts: [],
    user: null,
    failedAuth: false,
  };

  fetchPosts = () => {
    axios
      .get("http://localhost:8080/posts")
      .then((posts) => {

        this.setState({
          posts: posts.data,
        });

      })
      .catch((err) => {
        console.log("Error fetching posts: ", err);
      });
  };

  logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('user_id');
    window.location.reload(true);

    this.setState({
      user: null,
      failedAuth: true
    })
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.setState({ failedAuth: true });
      return;
    }
    if (this.props.id) {
      axios
        .get("http://localhost:8080/profile/" + this.props.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.setState({
            user: response.data[0],
          });
          sessionStorage.setItem("user_id", response.data.id);
        })
        .catch(() => {
          this.setState({
            failedAuth: true,
          });
        });

      axios
        .get("http://localhost:8080/posts/" + this.props.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.setState({
            posts: response.data
          });
          
          sessionStorage.setItem("user_id", response.data.id);
        })
        .catch(() => {
          this.setState({
            failedAuth: true,
          });
        });
    } else {
      axios
        .get("http://localhost:8080/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.setState({
            user: response.data,
          });
          sessionStorage.setItem("user_id", response.data.id);
          axios
        .get("http://localhost:8080/posts/" + response.data.id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.setState({
            posts: response.data
          });
          
        })
        .catch(() => {
          this.setState({
            failedAuth: true,
          });
        });
        })
        .catch(() => {
          this.setState({
            failedAuth: true,
          });
        });

         
    }
  }

  render() {
   
    if (this.state.failedAuth) {
      return (
        <div className="profile">
          <p>
            You must be logged in to see this page.{" "}
            <NavLink to="/login">Log in</NavLink>
          </p>
        </div>
      );
    }

    if (!this.state.user) {
      return (
        <div className="profile">
          <p>Loading...</p>
        </div>
      );
    }

    const { first_name, last_name, username, email, phone } = this.state.user;
    return (
      <section className="profile">
        <div className="profile__container">
          <div className="profile__group">
            <div className="profile__image">
              <img
                className="profile__picture"
                src={picture}
                alt="profile picture"
              />
            </div>
            <h1 className="profile__title">
              {first_name} {last_name}
            </h1>
            <h2 className="profile__contacts">Contacts</h2>
            <p className="profile__info">Username: {username}</p>
            <p className="profile__info">
              Name: {first_name} {last_name}
            </p>
            <p className="profile__info">Email: {email}</p>
            <p className="profile__info">Phone: {phone}</p>
          </div>
            <div className="profile__post">
          <h1 className="postpage__title">Posts</h1>
          <CreatePost onPostCreate={this.fetchPosts}/>
          
          { this.state.posts.map(post => (


            <div className="profile__post-container" key={post.post_id}>
            <div className="post__group">
              <h3 className="post__name">
                {first_name} {last_name}
              </h3>
              <p className="post__date">{new Date(post.updated_at).toLocaleDateString()}</p>
            </div>
            
                <p className="post__content">{post.content}</p>
            <div className="post__info">
              <p className="post__contact">Contact Info</p>
              <p className="post__email">Email: {email}</p>
              <p className="post__phone">Phone: {phone}</p>
            </div>
            </div>
          ))
            
     }
          
          <NavLink className="nav__links" to="/">
            <button className="profile__logout" onClick={this.logout}>Logout</button>
          </NavLink>
        </div>
        
        </div>
        
      </section>
      
    );
  }
}

export default Profile;
