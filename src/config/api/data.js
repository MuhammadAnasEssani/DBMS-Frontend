import { domain } from "./_Domain";

function getTermsAndConditions() {
    return fetch(`${domain}/Admin/GetTermsAndCondition`, {
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
  function getPrivacyPolicy() {
    return fetch(`${domain}/Admin/GetPrivacyPolicy`, {
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
  function getAboutUs() {
    return fetch(`${domain}/Admin/GetAboutUs`, {
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
  export { getTermsAndConditions, getPrivacyPolicy, getAboutUs};