import {useEffect, useState} from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'

function UsersResults() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
   fetchUsers()
  }, [])

  async function fetchUsers() {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()
    setUsers(data)
    setIsloading(false)
  }
 
  if(!isLoading){
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        )
        )}
      </div>
    )

  } else {
    return <Spinner />
  }

}

export default UsersResults