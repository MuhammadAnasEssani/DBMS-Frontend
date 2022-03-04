import axios from "../helper/axios";


function getOffers() {
  return axios.post(`/offers/getOffers`).then((res) => res)
}


export {getOffers };