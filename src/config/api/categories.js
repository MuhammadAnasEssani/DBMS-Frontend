import axios from "../helper/axios";


function getCategories() {
  return axios.get(`/category/getcategory`).then((res) => res)
}


export {getCategories };
