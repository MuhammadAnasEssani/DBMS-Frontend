import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../../component/notification/Notification";
import { getOrders } from "../../config/api/order";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);
  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      if (res.status === 200) {
        setOrders(res.data.orders);
      } else {
        Notification("Orders", "Something went wrong", "Error");
      }
    } catch (err) {
      Notification("Orders", "Something went wrong", "Error");
    }
  };
  useEffect(() => {
    {
      auth.authenticate && fetchOrders();
    }
  }, [auth.authenticate]);
  // console.log(orders)
  return (
    <section
      id="hero"
      className="d-flex "
      style={{ padding: "35px 0px", minHeight: "80vh" }}
    >
      <div className="container container-marginss">
        <div cursor="unset" class="Box-sc-15jsbqj-0 eeqMb">
          <div
            cursor="unset"
            class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 fIzSnz gvzJrZ"
          >
            <div
              cursor="unset"
              class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 fBbIPZ iIuvtb"
            >
              <div
                color="primary"
                variant="medium"
                defaultcolor="currentColor"
                class="IconStyle__StyledIcon-sc-18inybg-0 gVCCqM"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="injected-svg"
                    data-src="/assets/images/icons/bag_filled.svg"
                    xmlns="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M12.0002 0.75C10.8067 0.75 9.66209 1.22411 8.81817 2.06802C7.97426 2.91193 7.50015 4.05653 7.50015 5.25V6H6.87765C6.24624 5.99934 5.6389 6.24222 5.18207 6.6781C4.72523 7.11398 4.45412 7.70925 4.42515 8.34L3.83265 20.6775C3.81746 21.0093 3.86961 21.3407 3.98595 21.6517C4.10228 21.9628 4.2804 22.2471 4.50956 22.4875C4.73873 22.7278 5.01419 22.9193 5.31935 23.0504C5.62451 23.1814 5.95304 23.2493 6.28515 23.25H17.7152C18.0473 23.2493 18.3758 23.1814 18.681 23.0504C18.9861 22.9193 19.2616 22.7278 19.4907 22.4875C19.7199 22.2471 19.898 21.9628 20.0144 21.6517C20.1307 21.3407 20.1828 21.0093 20.1677 20.6775L19.5752 8.34C19.5462 7.70925 19.2751 7.11398 18.8182 6.6781C18.3614 6.24222 17.7541 5.99934 17.1227 6H16.5002V5.25C16.5002 4.05653 16.026 2.91193 15.1821 2.06802C14.3382 1.22411 13.1936 0.75 12.0002 0.75ZM9.00015 5.25C9.00015 4.45435 9.31622 3.69129 9.87883 3.12868C10.4414 2.56607 11.2045 2.25 12.0002 2.25C12.7958 2.25 13.5589 2.56607 14.1215 3.12868C14.6841 3.69129 15.0002 4.45435 15.0002 5.25V6H9.00015V5.25ZM7.77015 9.1425C7.77015 8.99416 7.81414 8.84916 7.89655 8.72582C7.97896 8.60249 8.0961 8.50636 8.23314 8.44959C8.37018 8.39283 8.52098 8.37797 8.66647 8.40691C8.81196 8.43585 8.94559 8.50728 9.05048 8.61217C9.15537 8.71706 9.2268 8.8507 9.25574 8.99618C9.28468 9.14167 9.26983 9.29247 9.21306 9.42951C9.1563 9.56656 9.06017 9.68369 8.93683 9.7661C8.81349 9.84851 8.66849 9.8925 8.52015 9.8925C8.32124 9.8925 8.13047 9.81348 7.98982 9.67283C7.84917 9.53218 7.77015 9.34141 7.77015 9.1425ZM14.7302 9.1425C14.7302 8.99416 14.7741 8.84916 14.8566 8.72582C14.939 8.60249 15.0561 8.50636 15.1931 8.44959C15.3302 8.39283 15.481 8.37797 15.6265 8.40691C15.772 8.43585 15.9056 8.50728 16.0105 8.61217C16.1154 8.71706 16.1868 8.8507 16.2157 8.99618C16.2447 9.14167 16.2298 9.29247 16.1731 9.42951C16.1163 9.56656 16.0202 9.68369 15.8968 9.7661C15.7735 9.84851 15.6285 9.8925 15.4802 9.8925C15.2812 9.8925 15.0905 9.81348 14.9498 9.67283C14.8092 9.53218 14.7302 9.34141 14.7302 9.1425Z"
                      fill="#E94560"
                    ></path>
                  </svg>
                </div>
              </div>
              <h2 font-size="25px" class="Typography-sc-1nbqu5-0 cXRrUk">
                My Orders
              </h2>
            </div>
          </div>
        </div>
        <div class="Hidden__StyledHidden-sc-1qvibwv-0 gIIbjc">
          <div class="TableRow-sc-1sslxri-0 kbWgmA">
            <h5
              font-weight="600"
              font-size="16px"
              color="text.muted"
              class="Typography-sc-1nbqu5-0 hsjXuq"
            >
              Order #
            </h5>
            <h5
              font-weight="600"
              font-size="16px"
              color="text.muted"
              class="Typography-sc-1nbqu5-0 hsjXuq"
            >
              Status
            </h5>
            <h5
              font-weight="600"
              font-size="16px"
              color="text.muted"
              class="Typography-sc-1nbqu5-0 hsjXuq"
            >
              Date purchased
            </h5>
            <h5
              font-weight="600"
              font-size="16px"
              color="text.muted"
              class="Typography-sc-1nbqu5-0 hsjXuq"
            >
              Total
            </h5>
            <h5
              font-weight="600"
              font-size="16px"
              color="text.muted"
              class="Typography-sc-1nbqu5-0 fybRfI"
            ></h5>
          </div>
        </div>
        {orders.length > 0 &&
          orders.map((data) => {
            return (
              <Link
                to={`/invoice/${data._id}`}
                class="TableRow-sc-1sslxri-0 jvUCMA"
              >
                <h5
                  font-weight="600"
                  font-size="16px"
                  class="Typography-sc-1nbqu5-0 hdlFid"
                >
                  {data._id}
                </h5>
                <div cursor="unset" class="Box-sc-15jsbqj-0 jXhFuk">
                  <div class="Chip-sc-1ovzis5-0 btpcmM">
                    <span
                      font-size="12px"
                      color="secondary.main"
                      class="Typography-sc-1nbqu5-0 fooWlQ"
                    >
                      {
                        data.orderStatus[
                          data.orderStatus.findIndex(
                            (status) => {
                              return (
                                status.isCompleted == false
                              );
                            }
                          ) != -1 ? data.orderStatus.findIndex(
                            (status) => {
                              return (
                                status.isCompleted == false
                              );
                            }
                          ) - 1 : 3
                        ].type
                      }
                    </span>
                  </div>
                </div>
                <div class="Typography-sc-1nbqu5-0 lfYJYZ flex-grow pre">
                  Feb 28, 2022
                </div>
                <div class="Typography-sc-1nbqu5-0 lfYJYZ">
                  {data.totalAmount}
                </div>
                <div class="Hidden__StyledHidden-sc-1qvibwv-0 XhRLt">
                  <div color="text.muted" class="Typography-sc-1nbqu5-0 sUFlx">
                    <button class="IconButton-sc-6b71ah-0 jCJfZQ">
                      <div
                        variant="small"
                        defaultcolor="currentColor"
                        class="IconStyle__StyledIcon-sc-18inybg-0 eVXIqO"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            class="injected-svg"
                            data-src="/assets/images/icons/arrow-right.svg"
                            xmlns="http://www.w3.org/1999/xlink"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.58333 11C3.58333 10.4477 4.03104 10 4.58333 10H17.4167C17.9689 10 18.4167 10.4477 18.4167 11C18.4167 11.5523 17.9689 12 17.4167 12H4.58333C4.03104 12 3.58333 11.5523 3.58333 11Z"
                              fill="#0F3260"
                            ></path>
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M10.2929 3.87615C10.6834 3.48562 11.3166 3.48562 11.7071 3.87615L18.1238 10.2928C18.3113 10.4803 18.4167 10.7347 18.4167 10.9999C18.4167 11.2651 18.3113 11.5195 18.1238 11.707L11.7071 18.1237C11.3166 18.5142 10.6834 18.5142 10.2929 18.1237C9.90237 17.7332 9.90237 17.1 10.2929 16.7095L16.0025 10.9999L10.2929 5.29036C9.90237 4.89983 9.90237 4.26667 10.2929 3.87615Z"
                              fill="#0F3260"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
