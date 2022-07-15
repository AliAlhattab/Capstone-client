import React from 'react'
import EditProfile from '../components/EditProfile/EditProfile'

function EditProfilePage({match:{params:{id}}}) {
  return (
    <EditProfile id={id}/>
  )
}

export default EditProfilePage