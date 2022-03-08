import axios from "../helper/axios";

function getProducts(slug) {
  return axios.get(`/products/${slug}`).then((res) => res);
}

function getProductDetail(productId) {
  return axios.get(`/product/${productId}`);
}
function getFeaturedProduct() {
  return axios.get(`/getFeaturedProducts`);
}
function getDiscountedProduct() {
  return axios.get(`/getDiscountedProducts`);
}

function getProductsByShop(data) {
  // console.log(data)
  return axios.post("/getProductsByShop", {
      shopId: data
    }).then((res) => res)
}
function getProductsByOffer(data) {
  // console.log(data)
  return axios.post("/getProductsByOffer", {
      offerId: data
    }).then((res) => res)
}
function getSearchedProducts(data) {
  // console.log(data)
  return axios.post("/searchProducts", {
      ...data
    }).then((res) => res)
}

export {
  getProducts,
  getProductDetail,
  getFeaturedProduct,
  getDiscountedProduct,
  getProductsByShop,
  getProductsByOffer,
  getSearchedProducts
};
