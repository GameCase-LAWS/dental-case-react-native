import React from 'react';

export const UserContext = React.createContext({
  user: {},
  setUser: () => {}
});

export const UserContextProvider = (props) => {
  const [user, setUser] = React.useState();

  const updateUser = (props) => {
    setUser(old => ({...old, ...props}));
  }

  const initState = {
    user,
    setUser,
    updateUser
  }

  return (
    <UserContext.Provider value={initState}>
      {props.children}
    </UserContext.Provider>
  )
}