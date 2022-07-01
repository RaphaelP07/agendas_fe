import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  token: localStorage.getItem('agendasToken') === null ? '' : JSON.parse(localStorage.getItem('agendasToken')),
  orgs: [],
  org: {}
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "http://localhost:3000/api/v1";

  //Actions
  function setToken(token) {
    dispatch({
      type: "SET_TOKEN",
      payload: token,
    });
  }

  function setOrgs(orgs) {
    dispatch({
      type: "SET_ORGANISATIONS",
      payload: orgs,
    });
  }

  function setOrg(org) {
    dispatch({
      type: "SET_ORGANISATIONS",
      payload: org,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        token: state.token,
        baseURL: baseURL,
        orgs: state.orgs,
        // organisation: state.org,
        setToken,
        setOrgs
        // setOrg
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
