import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class EditPost extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: '',
    phone: '',
    about: '',
    github:'',
    linkedin:'',
    error: "",
    id: this.props.match.params.id,
    success: false,
  };

  componentDidMount(){
    axios
    .get(`http://localhost:8080/profile/${this.state.id}`)
    .then(res => {
      this.setState({
        first_name: res.data[0].first_name,
        last_name: res.data[0].last_name,
        email: res.data[0].email,
        phone: res.data[0].phone,
        about: res.data[0].about,
        github: res.data[0].github,
        linkedin: res.data[0].linkedin,
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
    .put(`http://localhost:8080/profile/edit/${this.state.id}`, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        phone: this.state.phone,
        about: this.state.about,
        github: this.state.github,
        linkedin: this.state.linkedin,
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
        <section className="signup">
        <div className="signup__container">
          <h1 className="signup__title">Edit Profile</h1>
          <form className="signup__form" onSubmit={this.submit}>
            <label className="signup__label">First Name</label>
            <input
              className={`signup__input`}
              onChange={this.changeHandler}
              id="first_name"
              name="first_name"
              type="text"
              defaultValue={this.state.first_name}
              placeholder="First Name"
            />

            <label className="signup__label">Last Name</label>
            <input
              className={`signup__input`}
              onChange={this.changeHandler}
              id="last_name"
              name="last_name"
              type="text"
              defaultValue={this.state.last_name}
              placeholder="Last Name"
            />

            <label className="signup__label">Email</label>
            <input
              className={`signup__input`}
              onChange={this.changeHandler}
              id="email"
              name="email"
              type="text"
              defaultValue={this.state.email}
              placeholder="Email"
            />

            <label className="signup__label">Phone</label>
            <input
              className={`signup__input`}
              onChange={this.changeHandler}
              id="phone"
              name="phone"
              type="text"
              defaultValue={this.state.phone}
              placeholder="Phone"
            />

            <label className="signup__label">About Me</label>
            <textarea
              className={`createpost__text`}
              onChange={this.changeHandler}
              id="about"
              name="about"
              type="text"
              defaultValue={this.state.about}
              placeholder="About me"
            />

            <label className="signup__label">Github</label>
            <input
              className={`signup__input`}
              onChange={this.changeHandler}
              id="github"
              name="github"
              type="text"
              defaultValue={this.state.github}
              placeholder="github"
            />

            <label className="signup__label">Linkedin</label>
            <input
              className={`signup__input`}
              onChange={this.changeHandler}
              id="linkedin"
              name="linkedin"
              type="text"
              defaultValue={this.state.linkedin}
              placeholder=" Linkedin"
            />

            <button className="signup__button">Edit Profile</button>

            {this.state.success && <Redirect to="/profile" />}
          </form>
        </div>
      </section>
 
    );
  }
}

export default EditPost;
