import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  token: ''
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "http://localhost:3000.api/v1";

  //Actions
  function setToken(token) {
    dispatch({
      type: "SET_TOKEN",
      payload: token,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        baseURL: baseURL,
        setToken
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
