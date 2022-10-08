import React from 'react'

function Home() {
  const token = process.env.REACT_APP_GITHUB_TOKEN
  return (
    <div>
      <h1 className='text-6xl'>Welcome {token} 
      
      </h1>
    </div>
  )
}

export default Home