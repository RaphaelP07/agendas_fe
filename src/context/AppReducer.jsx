export default (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_ORGANISATIONS":
      return {
        ...state,
        orgs: action.payload,
      };
    case "SET_ORGANISATION":
      return {
        ...state,
        org: action.payload,
      };
    case "SET_TEAMS":
    return {
      ...state,
      teams: action.payload,
    };
    case "CREATE_TEAM":
    return {
      ...state,
      teams: [...state.teams, action.payload.data]
    };
    case "SET_MEMBERS":
    return {
      ...state,
      members: action.payload,
    };
    case "SET_MEETINGS":
    return {
      ...state,
      meetings: action.payload,
    };
    case "SET_MEETING":
    return {
      ...state,
      meeting: action.payload,
    };
    default:
      return state;
  }
};
