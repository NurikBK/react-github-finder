import React from 'react'
import UsersResults from '../components/users/UsersResults'

function Home() {
  const token = process.env.REACT_APP_GITHUB_TOKEN
  return (
    <>
      <UsersResults />
    </>
  )
}

export default Home