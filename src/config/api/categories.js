import axios from "../helper/axios";


function getCategories() {
  return axios.get(`/get-categories`).then((res) => res)
}


export {getCategories };
