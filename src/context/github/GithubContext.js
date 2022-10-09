import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  async function searchUsers(text) {
    setIsLoading();

    const params = new URLSearchParams({ q: text });

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await res.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  }

  async function getUser(login) {
    setIsLoading();

    const res = await fetch(`${GITHUB_URL}/search/users?q=${login}`);

    if (res.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await res.json();
      console.log(data);
      dispatch({
        type: 'GET_USER',
        payload: data.items[0],
      });
    }
  }

  // set isLoading
  function setIsLoading() {
    dispatch({ type: 'SET_LOADING' });
  }

  function clearUsers() {
    dispatch({
      type: 'CLEAR_USERS',
    });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        isLoading: state.isLoading,
        searchUsers,
        getUser,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
