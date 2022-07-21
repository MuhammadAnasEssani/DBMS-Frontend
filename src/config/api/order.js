import axios from "../helper/axios"


function addOrder(payload) {
    return axios.post(`/order`, payload).then((res) => res)
}
function getOrders() {
    return axios.get(`/order`).then((res) => res)
}

function getOrderDetail(orderId) {
    return axios.get(`/order/${orderId}`).then((res) => res)
}

export { addOrder,getOrders,getOrderDetail }