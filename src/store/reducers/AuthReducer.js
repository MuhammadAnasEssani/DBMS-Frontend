const initState = {
    user: {
      Token: null,
    },
  };
  
  function AuthReducer(state = initState, action) {
    // console.log(action.type)
    switch (action.type) {
      case "SET_USER": {
        return { ...state, user: action.payload };
      }
      case "UNSET_USER": {
        return { ...state, user: { Token: null } };
      }
      default: {
        return state;
      }
    }
  }
  
  export default AuthReducer;
  