import axios from "../helper/axios";

function getProducts(refId) {
    return axios.get(`/get-products/?type=30&ref_id=${refId}`).then((res) => res)
}

function getProductDetail(productId) {
  return axios.get(`/product/${productId}`).then((res) => res);
}

function getFeaturedProduct() {
    return axios.get(`/get-products/?type=10`).then((res) => res)
}
function getDiscountedProduct() {
    return axios.get(`/get-products/?type=20`).then((res) => res)
}

function getProductsByShop(refId) {
  // console.log(data)
    return axios.get(`/get-products/?type=40&ref_id=${refId}`).then((res) => res)
}
function getProductsByOffer(refId) {
  // console.log(data)
    return axios.get(`/get-products/?type=50&ref_id=${refId}`).then((res) => res)
}
function getSearchedProducts(data,model,modell) {
  // console.log(data)
  return axios.post(`/searchProducts?price[gte]=${model.lower}&price[lte]=${model.higher}`, {
      ...data,
      ...modell
    }).then((res) => res)
}
// function getSearchedProductsByPriceFilter(data,model) {
//   return axios.post("/searchProducts", {
//       ...data
//     }).then((res) => res)
// }

export {
  getProducts,
  getProductDetail,
  getFeaturedProduct,
  getDiscountedProduct,
  getProductsByShop,
  getProductsByOffer,
  getSearchedProducts
};
