import axios from "../helper/axios";



function userSignup(user) {
    return axios.post(`/signup`, {
        ...user,
    }).then((res) => res)
}

function userActivation(model){
    return axios.post("/email-activate", {
        ...model,
      }).then((res) => res)
}

function userSignin(user) {
    return axios.post("/signin", {
        ...user,
      }).then((res) => res)
}

function userForgotPassword(user) {
    return axios.post("/forgot-password", {
        ...user,
      }).then((res) => res)
}
function resetPassword(model) {
    return axios.post("/reset-password", {
        ...model,
      }).then((res) => res)
}

export { userSignup, userActivation, userSignin , userForgotPassword ,resetPassword };