function setUser(user) {
    return {
      type: "SET_USER",
      payload: user,
    };
  }
  
  function unSetUser() {
    // Notification("Authenticate", "Logout Sucessfully", "Success")
    return {
      type: "UNSET_USER",
    };
  }
  
  export { setUser, unSetUser };
  