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
    default:
      return state;
  }
};
