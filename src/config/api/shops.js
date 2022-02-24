
import { data } from "jquery";
import { domain } from "./_Domain";
// debugger
function getShops(model) {
    return fetch(`${domain}/Shop/GetShopsBySubCategoryId`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
          Accept: 'application/json',
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      //   "Access-Control-Allow-Origin": "*"
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        start: "0",
        length: "1000",
        Id: model.id
      })
    }).then((res) => res.json())
    .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;
  
}
function topReviewed() {
  return fetch(`${domain}/Shop/GetShopByRating`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify({
    //   Id: id
    // })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}
function recommendedShops() {
  return fetch(`${domain}/Shop/RecommendedShops`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify({
    //   Id: id
    // })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}
// debugger
function getShopsByWords(model) {
  // console.log(model)
    return fetch(`${domain}/Shop/GetShopsByFilter`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
          Accept: 'application/json',
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      //   "Access-Control-Allow-Origin": "*"
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        // Latitude: model.lat,
        // Longitude: model.lng,
        // SearchWord: model.queryString
        Start:"0",
    Length:"1000",
        Latitude:model.lat,
    Longitude:model.lng,
    SearchWord:model.SearchWord,
    Keyword: model.Keyword,
    // SearchWord:""
      })
    }).then((res) => res.json())
    .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;
  
}

function getShopDetailById(Id) {
  return fetch(`${domain}/Shop/GetShop`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      Id: Id
    })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}

function addReviews(token,model) {
  return fetch(`${domain}Shop/AddReview`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      ShopId: model.Id,
      Comment: model.comment,
      Rate: model.rating
    })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}
function editFeedback(token,model) {
  return fetch(`${domain}Shop/EditReview`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      ShopId: model.Id,
      Comment: model.comment,
      Rate: model.rating
    })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}
function getFeedback(model) {
  return fetch(`${domain}Shop/GetShopFeedBack`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      id: model.Id,
    })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}

function reviewReply(token,model) {
  return fetch(`${domain}/Shop/ReviewReply`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
        Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    //   "Access-Control-Allow-Origin": "*"
    },
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      ShopReviewId: model.shopReviewId,
      ShopId: model.shopId,
      Comment: model.coment
    })
  }).then((res) => res.json())
  .catch((err) => console.log("GetAccountInfo Api error**", err)) // body data type must match "Content-Type" header;

}



export { getShops,getShopsByWords,getShopDetailById, addReviews,reviewReply,topReviewed,recommendedShops,getFeedback,editFeedback };