import axios from "../helper/axios";


function getProducts(slug) {
  return axios.get(`/products/${slug}`).then((res) => res)
}

function getProductDetail(productId) {
    return axios.get(`/product/${productId}`)
  }


export {getProducts,getProductDetail };