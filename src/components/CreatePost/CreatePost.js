import React, { Component } from "react";
import axios from "axios";
import './CreatePost.scss'

class CreatePost extends Component {
  state = {
    website: '',
    content: "",
    tech: '',
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
        website: this.state.website,
        content: this.state.content,
        tech: this.state.tech,
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
        <div className="createpost__selector">
        <label className="createpost__label">Type of Website</label>
        <select className="createpost_select" name='website' id='website' onChange={this.changeHandler}>
        <option value=''></option>
          <option value='eCommerce'>eCommerce</option>
          <option value='Landing Page'>Landing Page</option>
          <option value='Portfolio'>Portfolio</option>
          <option value='Business'>Business</option>
          <option value='Others'>Others</option>
        </select>
        </div>
        
        <label className="createpost__label">Web Technology</label>
        <textarea
          className="createpost__tech"
          name="tech"
          id="tech"
          type="text"
          placeholder="E.g. HTML, CSS, JavaScript ... "
          onChange={this.changeHandler}
        />


        <label className="createpost__label">Add a description</label>
        <textarea
          className="createpost__text"
          name="content"
          id="content"
          type="text"
          placeholder="Add a description"
          onChange={this.changeHandler}
        />
        <button className="createpost__button">Post</button>
      </form>
      </section>
    );
  }
}

export default CreatePost;
