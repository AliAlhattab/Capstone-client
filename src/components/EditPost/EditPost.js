import React, { Component } from "react";
import axios from "axios";
import './EditPost.scss'
import { Redirect } from 'react-router-dom';

class EditPost extends Component {
  state = {
    website: "",
    content: "",
    error: "",
    id: this.props.match.params.id,
    success: false
  };

  componentDidMount(){
    axios
    .get(`http://localhost:8080/posts/single/${this.state.id}`)
    .then(res => {
      this.setState({
        website: res.data[0].website,
        content: res.data[0].content,
      })
    })
    .catch(err => {
      console.log(err)
    });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault()

    axios
    .put(`http://localhost:8080/posts/${this.state.id}`, {
        website: this.state.website,
        content: this.state.content,
        success: true
    })
    .then((response) => {
      this.setState({ success: true, error: "" });
      
    })
    .catch((err) => {
      this.setState({ success: false, error: err.response.data });
    });
  
  }
 

  render() {
    return (
        <section className="createpost">
          <div className="createpost__boxshadow">
          <h1 className="postpage__title">Edit Post</h1>
      <form className="createpost__container" onSubmit={this.submit}>
        <div className="createpost__selector">
        <label className="createpost__label">Type of Website</label>
        <select className="createpost_select" name='website' id='website' value={this.state.website} onChange={this.changeHandler}>
        <option value=''></option>
          <option value='eCommerce'>eCommerce</option>
          <option value='Landing Page'>Landing Page</option>
          <option value='Portfolio'>Portfolio</option>
          <option value='Business'>Business</option>
          <option value='Others'>Others</option>
        </select>
        </div>

        <label className="createpost__label">Add a description</label>
        <textarea
          className="createpost__text"
          name="content"
          id="content"
          type="text"
          placeholder="Add a description"
          defaultValue={this.state.content}
          onChange={this.changeHandler}
        />
        <button className="createpost__button">Edit Post</button>

        {this.state.success && <Redirect to="/profile" />}

      </form>
      </div>
      </section>
    );
  }
}

export default EditPost;
