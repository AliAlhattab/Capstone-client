import React from 'react'
import './Posts.scss'

function Posts({ post }) {

  let time = post.updated_at;
  let date = new Date(time);

  return (
    <article className='post'>
        <div className='post__group'>
        <h3 className='post__name'>{post.first_name} {post.last_name}</h3>
        <p className='post__date'>{date.toLocaleDateString()}</p>
        </div>
        <p className='post__content'>{post.content}</p>
        <div className='post__info'>
        <p className='post__contact'>Contact Info</p>
        <p className='post__email'>Email: {post.email}</p>
        <p className='post__phone'>Phone: {post.phone}</p>
        </div>
    </article>
  )
}

export default Posts