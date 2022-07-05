import React, { Component } from "react";
import Posts from "../components/Posts/Posts";
import axios from "axios";
import CreatePost from "../components/CreatePost/CreatePost";
import './PostsPage.scss'

class PostsPage extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    return (
      <section className="postpage">
        <div className="postpage__container">
        <h1 className="postpage__title">Posts</h1>

        <CreatePost onPostCreate={this.fetchPosts} />

        {this.state.posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
        </div>
      </section>
    );
  }

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
}

export default PostsPage;
