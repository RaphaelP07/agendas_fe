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
    default:
      return state;
  }
};
