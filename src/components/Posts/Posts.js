import React, { Component } from "react";
import "./Posts.scss";
import { NavLink } from "react-router-dom";
import deleteIcon from "../../assets/images/garabage.png";
import editIcon from "../../assets/images/edit.png";



class Posts extends Component{


  render(){
    let time = this.props.post.updated_at;
    let date = new Date(time);
    const id = sessionStorage.getItem("user_id");


  return (
    <article className="post">
      <div className="post__group">
        <NavLink className="post__link" to={"/profile/" + this.props.post.user_id}>
          <h3 className="post__name">
            {this.props.post.first_name} {this.props.post.last_name}
          </h3>
        </NavLink>
        <p className="post__date">{date.toLocaleDateString()}</p>
      </div>
      <p className="post__content">
        <strong>Website Type</strong>: {this.props.post.website}
      </p>
      <p className="post__content">
        <strong>Description</strong>: {this.props.post.content}
      </p>
      <div className="post__info">
        <p className="post__contact">Contact Info</p>
        <p className="post__email">Email: {this.props.post.email}</p>
        <p className="post__phone">Phone: {this.props.post.phone}</p>
      </div>
      <div className="post__actions">
        {this.props.post.user_id == id ? (
         <NavLink to={`/editpost/${this.props.post.post_id}`}> <img
            className="post__icons"
            src={editIcon}
            alt="edit"
          /></NavLink>
        ) : (
          ""
        )}
        {this.props.post.user_id == id ? (
          <img
            className="post__icons"
            onClick={() => {
              this.props.del(this.props.post.post_id);
            }}
            src={deleteIcon}
            alt="delete icon"
          />
        ) : (
          ""
        )}
      </div>
    </article>
  )
}
  
}


export default Posts;
