import axios from "../helper/axios"


function addOrder(payload) {
    return axios.post(`/addOrder`, payload).then((res) => res)
}
function getOrders() {
    return axios.get(`/getOrders`).then((res) => res)
}

function getOrderDetail(payload) {
    return axios.post(`/getOrder`, payload).then((res) => res)
}

export { addOrder,getOrders,getOrderDetail }