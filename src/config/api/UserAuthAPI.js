import axios from "../helper/axios";
import { domain } from "./_Domain";
// import axios from "../helper/axios";

function forgotPassword(model) {
  const url = `${domain}/Account/ForgotPasswordWeb`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: model.email,
    }),
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err))
}
function resetPassword(model, code) {
  const url = `${domain}/Account/ResetPassword`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({
      Email: model.email,
      Password: model.password,
      ConfirmPassword:model.cPassword,
      Code: code
    }),
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err))
}
function changePassword(model, token) {
  const url = `${domain}/Account/ChangePassword`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      OldPassword: model.oldPassword,
      NewPassword: model.newPassword,
      ConfirmPassword: model.cPassword,
    }),
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err))
}
function userSigIn(model) {
  const url = `${domain}/Account/Login`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: model.email,
      Password: model.password,
      RememberMe: false
    }),
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err))
}
function userSignUp(model) {
  const url = `${domain}/Account/RegisterPublicUser`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      FullName: model.name,
      Email: model.email,
      Contact: model.phone,
      Password: model.password,
    }),
  }).then((res) => res.json());
}
function editProfile(model,token) {
  const url = `${domain}/PublicUser/UpdateAccount`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      Name: model.name,
      Contact: model.contact,
      Image: model.image
    }),
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err))
}


function  addImage(form) {
  // console.log(form)
  return axios({
    method: "post",
    url: "Account/ImagePath",
    data: form,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
    },
  }).then((res) => res);
}
function businessSignUp(model) {
  const url = `${domain}User/register`;
  console.log(url);
  // return fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     username: model.name,
  //     userEmail: model.email,
  //     UserPhone: model.phone,
  //     userpassword: model.password,
  //     role_id: model.roleid,
  //   }),
  // }).then((res) => res.json());
}

export { businessSignUp, userSigIn, forgotPassword,resetPassword,changePassword,editProfile,addImage,userSignUp };