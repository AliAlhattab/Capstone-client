import React from 'react'
import Profile from '../components/Profile/Profile'

function ProfilePage({match:{params:{id}}}) {
  return (
    <Profile id={id}/>
  )
}

export default ProfilePage