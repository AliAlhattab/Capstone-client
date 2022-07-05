import React, { Component } from "react";
import axios from "axios";
import './CreatePost.scss'

class CreatePost extends Component {
  state = {
    content: "",
    error: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const id = sessionStorage.getItem('user_id')

    axios
      .post("http://localhost:8080/posts", 
      { 
        content: this.state.content,
        user_id: id
     })
      .then((response) => {
        this.setState({ success: true, error: "" });
        this.props.onPostCreate();
        e.target.reset();
      })
      .catch((err) => {
        this.setState({ success: false, error: err.response.data });
      });
  };

  render() {
    return (
        <section className="createpost">
      <form className="createpost__container" onSubmit={this.submit}>
        <label className="createpost__label">Make a Post</label>
        <textarea
          className="createpost__text"
          name="content"
          id="content"
          type="text"
          placeholder="Make a Post"
          onChange={this.changeHandler}
        />
        <button className="createpost__button">Post</button>
      </form>
      </section>
    );
  }
}

export default CreatePost;
