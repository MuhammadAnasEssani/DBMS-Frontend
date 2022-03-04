import axios from "../helper/axios";


function getShop() {
  return axios.get(`/get-shops`).then((res) => res)
}
function getShopDetail(shopId) {
    return axios.get(`/shop/${shopId}`)
  }


export {getShop ,getShopDetail};