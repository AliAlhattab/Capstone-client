import React from 'react'
import './Posts.scss'
import { NavLink } from 'react-router-dom'
import icon from '../../assets/images/garabage.png'


function Posts({ post, del }) {

  let time = post.updated_at;
  let date =  new Date(time);

  const id = sessionStorage.getItem('user_id')

      //   time.sort((a, b) => {
      //     return b.date - a.date;
      // });

  return (
   <article className='post'>
        <div className='post__group'>
        <NavLink className='post__link' to={'/profile/' + post.user_id}><h3 className='post__name'>{post.first_name} {post.last_name}</h3></NavLink>
        <p className='post__date'>{date.toLocaleDateString()} { post.user_id == id ? <img className='post__delete' onClick={() => {del(post.post_id)}} src={icon} alt='delete icon'/> : ''}</p>
        
        </div>
        <p className='post__content'><strong>Website Type</strong>: {post.website}</p>
        <p className='post__content'><strong>Description</strong>: {post.content}</p>
        <div className='post__info'>
        <p className='post__contact'>Contact Info</p>
        <p className='post__email'>Email: {post.email}</p>
        <p className='post__phone'>Phone: {post.phone}</p>
        </div>
    </article>
  )
  
}

export default Posts