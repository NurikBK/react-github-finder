import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
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

  // set isLoading
  function setIsLoading() {
    dispatch({ type: 'SET_LOADING' });
  }

  function clearUsers() {
    dispatch({
      type: 'CLEAR_USERS',
    });
    console.log('click');
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
