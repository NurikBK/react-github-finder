import {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import {useContext, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import Spinner from '../components/layout/Spinner'



function User() {
  const {user, getUser, isLoading} = useContext(GithubContext)
  const params = useParams()

  useEffect(() => {
    getUser(params.login)
    // getUserRepo(params.login)
  }, [])

  const {type, avatar_url, location, bio, blog, twitter_username, login, html_url, followers, following, public_repos, public_gists, hireable} = user

  if(isLoading) {
    return <Spinner />
  }

  return (
   <>
    <div className="w-full mx-auto lg:w-10/12">
      <div className="mb-4">
        <Link to='/' className='btn btn-ghost'>Back to Search</Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
        <div className="custom-card-image mb-6 md:mb-0">
          <div className="rounded-lg shadow-lx card image-full">
            <figure>
              <img src={avatar_url} alt="profile" />
            </figure>
            <div className="card-body justyfy-end">
              <h2 className="card-title mb-0">
                {}
              </h2>
              <p>{login}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default User