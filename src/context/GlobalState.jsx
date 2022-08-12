import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  token: localStorage.getItem('agendasToken') === null ? '' : JSON.parse(localStorage.getItem('agendasToken')),
  orgs: [],
  org: {},
  teams: [],
  team: {},
  members: [],
  member: {},
  meetings: [],
  meeting: {}
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
      type: "SET_ORGANISATION",
      payload: org,
    });
  }

  function setTeams(teams) {
    dispatch({
      type: "SET_TEAMS",
      payload: teams,
    });
  }

  function setTeam(team) {
    dispatch({
      type: "SET_TEAM",
      payload: team,
    });
  }

  function createTeam(team) {
    dispatch({
      type: "CREATE_TEAM",
      payload: team,
    });
  }

  function editTeam(team) {
    dispatch({
      type: "EDIT_TEAM",
      payload: team,
    });
  }

  function setMembers(members) {
    dispatch({
      type: "SET_MEMBERS",
      payload: members,
    });
  }

  function setMember(member) {
    dispatch({
      type: "SET_MEMBER",
      payload: member,
    });
  }

  function setMeetings(meetings) {
    dispatch({
      type: "SET_MEETINGS",
      payload: meetings,
    });
  }

  function setMeeting(meeting) {
    dispatch({
      type: "SET_MEETING",
      payload: meeting,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        baseURL: baseURL,
        token: state.token,
        orgs: state.orgs,
        teams: state.teams,
        team: state.team,
        members: state.members,
        member: state.member,
        meetings: state.meetings,
        meeting: state.meeting,
        organisation: state.org,
        setToken,
        setTeams,
        setTeam,
        createTeam,
        editTeam,
        setMembers,
        setMember,
        setMeetings,
        setMeeting,
        setOrgs,
        setOrg
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
