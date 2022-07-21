import axios from "../helper/axios";


function getOffers() {
  return axios.get(`/get-offers`).then((res) => res)
}


export {getOffers };