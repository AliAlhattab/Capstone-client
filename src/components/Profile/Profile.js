import { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import picture from "../../assets/images/default_picture.jpg";
import "./Profile.scss";
import CreatePost from "../CreatePost/CreatePost";
import deleteIcon from "../../assets/images/garabage.png";
import editIcon from "../../assets/images/edit.png";

const userId = sessionStorage.getItem("user_id");

class Profile extends Component {
  state = {
    posts: [],
    user: null,
    failedAuth: false,
  };

  deletePost = (id) => {
    axios
      .delete(`http://localhost:8080/posts/` + id)
      .then((response) => {
        this.fetchPosts();
      })
      .catch((err) => {});
  };

  fetchPosts = () => {
    axios
      .get("http://localhost:8080/posts/" + userId)
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
    sessionStorage.removeItem("user_id");
    window.location.reload(true);

    this.setState({
      user: null,
      failedAuth: true,
    });
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
            posts: response.data,
          });
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
                posts: response.data,
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

  componentDidUpdate(prevProp, prevState) {
    const token = sessionStorage.getItem("token");
    if (this.props.id !== prevProp.id && this.props.id === undefined) {
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
                posts: response.data,
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

    const { first_name, last_name, username, email, phone, id, about, linkedin, github} =
      this.state.user;
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
            <h2 className="profile__contacts">About Me</h2>
            <p className="profile__info">{about}</p>
            <h2 className="profile__contacts">Contacts</h2>
            <p className="profile__info">Email: {email}</p>
            <p className="profile__info">Phone: {phone}</p>
            <a href={linkedin}><p className="profile__info">{linkedin}</p></a>
            <a href={github}><p className="profile__info">{github}</p></a>
          </div>
          <div className="profile__post">
            <h1 className="postpage__title">Posts</h1>
            {userId == id ? <CreatePost onPostCreate={this.fetchPosts} /> : ""}

            {this.state.posts.map((post) => (
              <div className="profile__post-container" key={post.post_id}>
                <div className="post__group">
                  <h3 className="post__name">
                    {post.first_name} {post.last_name}
                  </h3>
                  <p className="post__date">
                    {new Date(post.updated_at).toLocaleDateString()}
                  </p>
                </div>

                <p className="post__content">
                  <strong>Website Type</strong>: {post.website}
                </p>
                <p className="post__content">
                  <strong>Web Technology</strong>: {post.tech}
                </p>
                <p className="post__content">
                  <strong>Description</strong>: {post.content}
                </p>
                <div className="post__info">
                  <p className="post__contact">Contact Info</p>
                  <p className="post__email">Email: {email}</p>
                  <p className="post__phone">Phone: {phone}</p>
                </div>
                <div className="post__actions">
                  {userId == id ? (
                    <NavLink to={`/editpost/${post.post_id}`}>
                      {" "}
                      <img className="post__icons" src={editIcon} alt="edit" />
                    </NavLink>
                  ) : (
                    ""
                  )}
                  {userId == id ? (
                    <img
                      className="post__icons"
                      onClick={() => {
                        this.deletePost(post.post_id);
                      }}
                      src={deleteIcon}
                      alt="delete icon"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
            {userId == id ? (
              <NavLink className="nav__links" to="/">
              <button className="profile__logout" onClick={this.logout}>
                Logout
              </button>
            </NavLink>

            )
          : (
            ''
          )}
            
            {userId == id ? (
            <NavLink to={`/edit/${userId}`}><button className="profile__logout">
                Edit Profile
              </button></NavLink>
            ) : (
              ''
            )

                }

          
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
