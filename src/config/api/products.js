import axios from "../helper/axios";

function getProducts(slug,model,modell) {
  return axios.post(`/products/${slug}?price[gte]=${model.lower}&price[lte]=${model.higher}`,{
    ...modell
  }).then((res) => res);
}

function getProductDetail(productId) {
  return axios.get(`/product/${productId}`).then((res) => res);
}
function getFeaturedProduct(model,modell) {
  return axios.post(`/getFeaturedProducts?price[gte]=${model.lower}&price[lte]=${model.higher}`,{
    ...modell
  }).then((res) => res);
}
function getDiscountedProduct(model,modell) {
  return axios.post(`/getDiscountedProducts?price[gte]=${model.lower}&price[lte]=${model.higher}`,{
    ...modell
  }).then((res) => res);;
}

function getProductsByShop(data,model,modell) {
  // console.log(data)
  return axios.post(`/getProductsByShop?price[gte]=${model.lower}&price[lte]=${model.higher}`, {
      shopId: data,
      ...modell
    }).then((res) => res)
}
function getProductsByOffer(data,model,modell) {
  // console.log(data)
  return axios.post(`/getProductsByOffer?price[gte]=${model.lower}&price[lte]=${model.higher}`, {
      offerId: data,
      ...modell
    }).then((res) => res)
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
