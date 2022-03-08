import axios from "../helper/axios";

function addReviews(data) {
    return axios.post("/add-review", {
        ...data,
      }).then((res) => res)
}
function getProductRatings(data) {
    // console.log(data)
    return axios.post("/getRatingByProductId", {
        productId: data
      }).then((res) => res)
}

export { addReviews,getProductRatings };