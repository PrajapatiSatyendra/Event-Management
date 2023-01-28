import React, { useCallback, useState, useEffect } from 'react';


const AuthContext = React.createContext({
  token: '',
  userName: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },

});



const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedUserId = localStorage.getItem('userId');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userName');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: storedUserId
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialUserId;

  let logoutTimer;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUserId = tokenData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const [role, setRole] = useState();

  let userIsLoggedIn = null
  if (token) {
    userIsLoggedIn = true;
    localStorage.setItem("isLoggedIn", userIsLoggedIn);
  } else {
    userIsLoggedIn = false;
    localStorage.setItem("isLoggedIn", userIsLoggedIn);
  }
  // const userIsLoggedIn = !!token;
  const logoutHandler = useCallback(() => {
    setToken(null);

    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmailId');


    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

  }, []);

  const loginHandler = (token, expirationTime, userName, userId, email, role) => {
    setToken(token);
    setUserId(userId);
    setRole(role);

    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    localStorage.setItem("email", email);



    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(expirationTime))
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);


  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    role: role

  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};






export default AuthContext;