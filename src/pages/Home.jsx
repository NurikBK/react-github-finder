import React from 'react'
import UsersResults from '../components/users/UsersResults'
import UserSearch from '../components/users/UserSearch'


function Home() {
  const token = process.env.REACT_APP_GITHUB_TOKEN
  return (
    <>
      <UserSearch />
      <UsersResults />
    </>
  )
}

export default Home