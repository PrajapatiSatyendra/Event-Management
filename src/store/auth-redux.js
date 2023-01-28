import { createSlice, configureStore } from "@reduxjs/toolkit";


/**---------------------------------------functions----------------------------------------------------------------------- */
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUserId = localStorage.getItem("userId");
    const remainingTime = calculateRemainingTime(storedExpirationDate);
    const userName = localStorage.getItem('userName');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
      localStorage.removeItem("userName");
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
      userId: storedUserId,
      userName,
      role,
    email
  };
};
/**---------------------------------------------------------------------------------------------------------------------------- */
let tokenData = retrieveStoredToken();
const initialState = {
    token: tokenData?.token,
    userName: tokenData?.userName,
    userId:tokenData?.userId,
    isLoggedIn: !!tokenData?.token,
    logoutTimer: null,
    role: tokenData?.role,
    email: tokenData?.email,
    expirationTime:null
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler(state, action) {
        state.token = action.payload.token;
        state.expirationTime = action.payload.expirationTime;
        state.userName = action.payload.userName;
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.role = action.payload.role;

        localStorage.setItem('token',state.token);
        localStorage.setItem('expirationTime',state.expirationTime);
        localStorage.setItem('userName',state.userName);
        localStorage.setItem('userId',state.userId);
        localStorage.setItem("email", state.email);
        localStorage.setItem('role', state.role);

       state.logoutTimer = setTimeout(authSlice.actions.logoutHandler, calculateRemainingTime(action.payload.expirationTime))
    },

    logoutHandler(state) {
        state.token = null;
        state.userName = null;
        state.userId = null;
        state.email = null;
        state.role = null;

        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        
        if (state.logoutTimer) {
        clearTimeout(state.logoutTimer);
        }
   }
  },
});
