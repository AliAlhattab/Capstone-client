import React from 'react'
import EditPost from '../components/EditPost/EditPost'

function EditPostPage({match:{params:{id}}}) {
  return (
    <EditPost id={id}/>
  )
}

export default EditPostPage