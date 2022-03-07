import axios from "../helper/axios";


function getProducts(slug) {
  return axios.get(`/products/${slug}`).then((res) => res)
}

function getProductDetail(productId) {
    return axios.get(`/product/${productId}`)
  }
  function getFeaturedProduct() {
    return axios.get(`/getFeaturedProducts`)
  }
  function getDiscountedProduct() {
    return axios.get(`/getDiscountedProducts`)
  }

export {getProducts,getProductDetail,getFeaturedProduct,getDiscountedProduct };