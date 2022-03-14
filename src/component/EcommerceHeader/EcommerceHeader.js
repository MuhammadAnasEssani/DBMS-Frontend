import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Dropdown, Form, Spin, Space, Drawer } from "antd";
import { Modal } from "antd";
import { AiOutlineSearch, AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useHistory, Link } from "react-router-dom";
import { authConstants } from "../../store/actions/contants";
import Cart from "../Cart/Cart";
import { userSignin, userSignup } from "../../config/api/auth";
import { LoadingOutlined } from "@ant-design/icons";
import $ from "jquery";
import LOGO from "../../images/e-commerce-logo-1.png";
import Notification from "../../component/notification/Notification";
import { MdDashboardCustomize, MdKeyboardArrowDown } from "react-icons/md";
import { getCategories } from "../../config/api/categories";


export default function EcommerceHeader() {
  const auth = useSelector((state) => state.auth);
  const [filter, setFilter] = useState(false);
  const [visible, setVisible] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const history = useHistory();
  const [authVisible, setAuthVisible] = useState("");
  const [signup, setSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [categories, setCategories] = useState([]);
  const [Searchvalue, setValue] = useState("");
  const { SubMenu } = Menu;
  const removeStyle = () => {
    setTimeout(() => {
      $(".body").removeAttr("Style");
    });
  };
  const onClose = () => {
    setVisible(false);
    removeStyle();
  };
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const pathName = window.location.pathname;
  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      if (res.status == 200) {
        setCategories(res.data.categoryList);
        return;
      } else {
        Notification("Categories", "Something went wrong", "Error");
        return;
      }
    } catch (err) {
      Notification("Categories", "Something went wrong", "Error");
    }
    // console.log(res)
  };
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        category.children.length > 0 ? (
          <SubMenu key={category.id} title={category.name} onClick={() => {
            setFilter(false)
            history.push(`/${category.slug}?cid=${category._id}&type=${category.type}`)
          }}>
            {renderCategories(category.children)}
          </SubMenu>
        ) : (
          <Menu.Item key={category.id} onClick={() => {
            setFilter(false)
            history.push(`/${category.slug}?cid=${category._id}&type=${category.type}`)
          }}>{category.name}</Menu.Item>
        )
      );
    }
    return myCategories;
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = { firstName, lastName, email, password, cpassword };
      const res = await userSignup(user);
      if (res.status === 201) {
        Notification("Signup", res.data.message, "Success");
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        setAuthVisible(false);
        return;
      } else {
        Notification("Signup", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch (err) {
      Notification("Signup", "Something went wrong", "Error");
      setLoading(false);
    }
  };
  const onKeyUp = (e) => {
    if (e.charCode === 13) {
      e.preventDefault();
      history.push(`/search-products/${Searchvalue}`);
    }
  };
  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const users = {
        email,
        password,
      };
      const res = await userSignin(users);
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCESS,
          payload: {
            token,
            user,
          },
        });
        Notification("Login", res.data.message, "Success");
        setLoading(false);
        setEmail("");
        setPassword("");
        setAuthVisible(false);
        return;
      } else {
        Notification("Login", res.data.message, "Error");
        setLoading(false);
        return;
      }
    } catch {
      setLoading(false);
      Notification("Login", "Something went wrong", "Error");
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    Notification("Logout", "Logout Successfully", "Success");
  };
  const userMenu = (
    <Menu>
      {auth.authenticate && (
        <Menu.Item
          onClick={() => {
            history.push("/account/orders");
          }}
        >
          <span>My Orders</span>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          history.push("/shops");
        }}
      >
        <span>All Shops</span>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    {
      (pathName == "/checkout" ||
        pathName.split("/")[1] == "invoice" ||
        pathName == "/account/orders") &&
        !auth.authenticate &&
        setAuthVisible(true);
    }
    // {pathName.split("/")[1] == "invoice"}
    removeStyle();
    getAllCategories();
  }, [removeStyle(), pathName, auth.authenticate]);
  return (
    <>
    <div style={{ position: "relative" }}>
        <div
          className={
            filter
              ? "col-xl-3 col-lg-3 col-md-3 col-12 mobile-categories filter-sidebar"
              : "col-xl-3 col-lg-3 col-md-3 col-12 mobile-categories filter"
          }
        >
          <div
            className="side-bar"
            style={{ height: "auto", maxHEight: "80vh" }}
          >
            <Menu mode="inline">
              {categories.length > 0 && renderCategories(categories)}
            </Menu>
          </div>
        </div>
      </div>
      <Modal
        title="Login"
        centered
        visible={authVisible}
        onCancel={() => {
          {
            pathName == "/checkout" || pathName.split("/")[1] == "invoice"
              ? auth.authenticate && setAuthVisible(false)
              : setAuthVisible(false);
          }
        }}
        width={400}
      >
        <div className="col-lg-12">
          <form onSubmit={signup ? handleSignup : handleSignin}>
            <div className="col-lg-12">
              <div className="row">
                {signup && (
                  <div className="col-lg-6">
                    <label className="labeltext">First Name</label>
                    <input
                      required
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="FormInput"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                )}
                {signup && (
                  <div className="col-lg-6">
                    <label className="labeltext">Last Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="FormInput"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-lg-12">
                <label className="labeltext">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@yahoo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div className="col-lg-12">
                <label className="labeltext">Password</label>
                <input
                  required
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="FormInput"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              {signup && (
                <div className="col-lg-12">
                  <label className="labeltext">Confirm Password</label>
                  <input
                    required
                    type="password"
                    placeholder="*********"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    className="FormInput"
                    style={{ borderRadius: "10px" }}
                  />
                </div>
              )}
              <div
                className="col-lg-12 row"
                style={{
                  margin: "0px",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  // to="/forgot-password"
                  className="col-lg-5 col-12"
                  style={{
                    textDecoration: "underline",
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Forgot password
                </Link>
                <a
                  // target="_blank"
                  // href="https://portal.uaqbusiness.com/Account/Login?ReturnUrl=%2F"
                  className="col-lg-7 col-12"
                  style={{
                    textDecoration: "underline",
                    color: "#333",
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: "end",
                  }}
                >
                  Become a seller
                </a>
              </div>
              <div className="col-lg-12 text-center">
                {/* <Form.Item> */}
                {loading ? (
                  <button
                    style={{ border: "none" }}
                    type="submit"
                    id="buttonHover"
                    className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      padding: "15px 40px",
                    }}
                  >
                    <>
                      <Spin indicator={antIcon} />
                    </>
                  </button>
                ) : (
                  <button
                    style={{ border: "none" }}
                    type="submit"
                    id="buttonHover"
                    className="btn btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      padding: "15px 40px",
                    }}
                    // onClick={handleSignin}
                  >
                    <>
                      {signup ? <span>Signup</span>  : <span>Signin</span>}
                      <i className="bi bi-arrow-right arrow_right"></i>
                    </>
                  </button>
                )}
                {/* </Form.Item> */}
              </div>
              {signup ? (
                <div className="col-lg-12">
                  <p className="mt-5 text-center">
                    Already have an account
                    <span
                      // target="_blank"
                      // href="https://portal.uaqbusiness.com/en-US/Account/Register"
                      // to="/signup"
                      className=""
                      style={{
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "rgb(125, 135, 156)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSignup(false);
                      }}
                    >
                      &nbsp;Signin Now
                    </span>
                  </p>
                </div>
              ) : (
                <div className="col-lg-12">
                  <p className="mt-5 text-center">
                    Dont have an account?
                    <span
                      // target="_blank"
                      // href="https://portal.uaqbusiness.com/en-US/Account/Register"
                      // to="/signup"
                      className=""
                      style={{
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "rgb(125, 135, 156)",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSignup(true);
                      }}
                    >
                      &nbsp;Signup Now
                    </span>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <Drawer placement="right" onClose={onClose} visible={visible}>
        {/* <AdminNav /> */}
        <Cart close={onClose}/>
      </Drawer>
      <div class="SickyStyle__StyledSticky-sc-tdyipr-0 gAWxBn">
        <header class="HeaderStyle__StyledHeader-sc-1iz07og-0 eXggWe">
          <div
            display="flex"
            height="100%"
            class="Container-sc-1n5dyua-0 eDoFvF"
          >
            <div
              class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 jSmucx kenOTe logo"
              cursor="unset"
            >
              <Link to="/">
                <img
                // style={{width: "72px"}}
                  src={LOGO}
                  alt="logo"
                  display="block"
                  class="Image-sc-1tga9wa-0 ga-dZTE"
                />
              </Link>
              <div
              className="categories-header-mobile"
              onClick={() => {
                filter ? setFilter(false) : setFilter(true);
              }}
            >
              <MdDashboardCustomize className="category-header-icon" />
              <MdKeyboardArrowDown className="category-header-icon" />
            </div>
            </div>
            <div
              cursor="unset"
              class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 vndmm eznwtF"
            >
              <div cursor="unset" class="Box-sc-15jsbqj-0 jjfMKS">
                <div class="SearchBoxStyle__StyledSearchBox-sc-4kf442-0 gpBtzH">
                  <div
                    class="IconStyle__StyledIcon-sc-18inybg-0 kuUBhu search-icon"
                    variant="medium"
                    defaultcolor="currentColor"
                  >
                    <div>
                    {/* <Link to={`/search-products/${Searchvalue}`}> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        class="injected-svg"
                        data-src="/assets/images/icons/search.svg"
                        xlink="http://www.w3.org/1999/xlink"
                        style={{cursor: "pointer"}}
                        onClick={()=> {
                            history.push(`/search-products/${Searchvalue}`)
                        }}
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.16667 3.5C6.03705 3.5 3.5 6.03705 3.5 9.16667C3.5 12.2963 6.03705 14.8333 9.16667 14.8333C12.2963 14.8333 14.8333 12.2963 14.8333 9.16667C14.8333 6.03705 12.2963 3.5 9.16667 3.5ZM1.5 9.16667C1.5 4.93248 4.93248 1.5 9.16667 1.5C13.4009 1.5 16.8333 4.93248 16.8333 9.16667C16.8333 13.4009 13.4009 16.8333 9.16667 16.8333C4.93248 16.8333 1.5 13.4009 1.5 9.16667Z"
                          fill="#7D879C"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M13.1679 13.1679C13.5584 12.7774 14.1916 12.7774 14.5821 13.1679L18.2071 16.7929C18.5976 17.1834 18.5976 17.8166 18.2071 18.2071C17.8166 18.5976 17.1834 18.5976 16.7929 18.2071L13.1679 14.5821C12.7774 14.1916 12.7774 13.5584 13.1679 13.1679Z"
                          fill="#7D879C"
                        ></path>
                      </svg>
                      {/* </Link> */}
                    </div>
                  </div>
                  <div
                    placeholder="Search and hit enter..."
                    class="TextFieldStyle__TextFieldWrapper-sc-h6a756-1 jpTETm"
                  >
                    <div cursor="unset" class="Box-sc-15jsbqj-0 hXjvFQ">
                      <input
                        class="TextFieldStyle__SyledTextField-sc-h6a756-0 Lznse search-field"
                        placeholder="Search and hit enter..."
                        color="default"
                        id="0.9317837622580987"
                        value={Searchvalue}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyPress={onKeyUp}
                      />
                    </div>
                  </div>
                  <div
                    direction="right"
                    class="Menu__StyledMenu-sc-1yj7pzw-0 ekDXAL category-dropdown"
                  >
                    <div
                      class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 dNNxsU hccqyr dropdown-handler"
                      cursor="unset"
                    >
                      <span>All Categories</span>
                      <div
                        variant="small"
                        defaultcolor="currentColor"
                        class="IconStyle__StyledIcon-sc-18inybg-0 fOXWXv"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-chevron-down injected-svg"
                            data-src="/assets/images/icons/chevron-down.svg"
                            xlink="http://www.w3.org/1999/xlink"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 dNNxsU hccqyr header-right"
              cursor="unset"
            >
              <div className="header-icons">
                <Dropdown overlay={userMenu} placement="bottomLeft">
                  <div className="header-icon mobile-icon">
                    <AiOutlineUser />
                  </div>
                </Dropdown>
                {auth.token != null ? (
                  <div className="header-icon" onClick={logout}>
                    <RiLogoutCircleLine />
                  </div>
                ) : (
                  <div
                    className="header-icon"
                    onClick={() => {
                      authVisible
                        ? pathName == "/checkout"
                          ? auth.authenticate && setAuthVisible(false)
                          : setAuthVisible(false)
                        : setAuthVisible(true);
                    }}
                  >
                    <AiOutlineLogin />
                  </div>
                )}
                <div
                  className="header-icon"
                  onClick={() => {
                    visible ? setVisible(false) : setVisible(true);
                  }}
                  style={{ position: "relative" }}
                >
                  <IoBagCheckOutline />
                  <div
                    cursor="unset"
                    class="Box-sc-15jsbqj-0 FlexBox-vldgmo-0 dlowzc iDDLYe"
                  >
                    <span
                      font-size="10px"
                      color="white"
                      font-weight="600"
                      class="Typography-sc-1nbqu5-0 YnhBG"
                    >
                      {Object.keys(cart.cartItems).reduce((count, key) => {
                        return count + 1;
                      }, 0)}
                    </span>
                  </div>
                </div>
              </div>
              {/* <button class="IconButton-sc-6b71ah-0 eWiIvS">
                <div
                  variant="medium"
                  defaultcolor="currentColor"
                  class="IconStyle__StyledIcon-sc-18inybg-0 cumxXm"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      class="injected-svg"
                      data-src="/assets/images/icons/user.svg"
                      xlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9441 9.62492C15.9441 10.2953 15.6778 10.9383 15.2037 11.4123C14.7297 11.8864 14.0868 12.1527 13.4163 12.1527C12.7459 12.1527 12.103 11.8864 11.6289 11.4123C11.1549 10.9383 10.8886 10.2953 10.8886 9.62492C10.8886 8.95451 11.1549 8.31156 11.6289 7.83751C12.103 7.36346 12.7459 7.09714 13.4163 7.09714C14.0868 7.09714 14.7297 7.36346 15.2037 7.83751C15.6778 8.31156 15.9441 8.95451 15.9441 9.62492ZM13.4163 13.4166C14.422 13.4166 15.3864 13.0171 16.0975 12.306C16.8085 11.595 17.208 10.6305 17.208 9.62492C17.208 8.61931 16.8085 7.65488 16.0975 6.94381C15.3864 6.23273 14.422 5.83325 13.4163 5.83325C12.4107 5.83325 11.4463 6.23273 10.7352 6.94381C10.0242 7.65488 9.62467 8.61931 9.62467 9.62492C9.62467 10.6305 10.0242 11.595 10.7352 12.306C11.4463 13.0171 12.4107 13.4166 13.4163 13.4166ZM20.9997 19.736C20.9997 20.9999 19.7358 20.9999 19.7358 20.9999H7.0969C7.0969 20.9999 5.83301 20.9999 5.83301 19.736C5.83301 18.4721 7.0969 14.6805 13.4163 14.6805C19.7358 14.6805 20.9997 18.4721 20.9997 19.736ZM19.7358 19.731C19.7345 19.4201 19.5411 18.4848 18.6842 17.6279C17.8602 16.8038 16.3094 15.9444 13.4163 15.9444C10.522 15.9444 8.97251 16.8038 8.14845 17.6279C7.29154 18.4848 7.09942 19.4201 7.0969 19.731H19.7358Z"
                        fill="#4B566B"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button> */}
              {/* <div
                cursor="unset"
                class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 jUQkgC edOqpx undefined cursor-pointer"
              >
                <button class="IconButton-sc-6b71ah-0 kvAlJD">
                  <div
                    variant="medium"
                    defaultcolor="currentColor"
                    class="IconStyle__StyledIcon-sc-18inybg-0 bMrWVK"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="injected-svg"
                        data-src="/assets/images/icons/bag.svg"
                        xlink="http://www.w3.org/1999/xlink"
                      >
                        <path
                          d="M12 0.75C10.8066 0.75 9.66196 1.22411 8.81805 2.06802C7.97414 2.91193 7.50003 4.05653 7.50003 5.25V6H6.87753C6.24612 5.99934 5.63878 6.24222 5.18194 6.6781C4.72511 7.11398 4.45399 7.70925 4.42503 8.34L3.83253 20.6775C3.81734 21.0093 3.86949 21.3407 3.98582 21.6517C4.10216 21.9628 4.28028 22.2471 4.50944 22.4875C4.7386 22.7278 5.01407 22.9193 5.31923 23.0504C5.62439 23.1814 5.95292 23.2493 6.28503 23.25H17.715C18.0471 23.2493 18.3757 23.1814 18.6808 23.0504C18.986 22.9193 19.2615 22.7278 19.4906 22.4875C19.7198 22.2471 19.8979 21.9628 20.0142 21.6517C20.1306 21.3407 20.1827 21.0093 20.1675 20.6775L19.575 8.34C19.5461 7.70925 19.2749 7.11398 18.8181 6.6781C18.3613 6.24222 17.7539 5.99934 17.1225 6H16.5V5.25C16.5 4.05653 16.0259 2.91193 15.182 2.06802C14.3381 1.22411 13.1935 0.75 12 0.75V0.75ZM9.00003 5.25C9.00003 4.45435 9.3161 3.69129 9.87871 3.12868C10.4413 2.56607 11.2044 2.25 12 2.25C12.7957 2.25 13.5587 2.56607 14.1213 3.12868C14.684 3.69129 15 4.45435 15 5.25V6H9.00003V5.25ZM18.075 8.4075L18.6675 20.7525C18.6722 20.8815 18.6515 21.0102 18.6064 21.1311C18.5614 21.2521 18.493 21.363 18.405 21.4575C18.3153 21.5497 18.208 21.623 18.0895 21.6733C17.971 21.7235 17.8437 21.7496 17.715 21.75H6.28503C6.15635 21.7496 6.02904 21.7235 5.91056 21.6733C5.79208 21.623 5.68481 21.5497 5.59503 21.4575C5.50711 21.363 5.43867 21.2521 5.39363 21.1311C5.34859 21.0102 5.32783 20.8815 5.33253 20.7525L5.92503 8.4075C5.93661 8.16276 6.04204 7.9319 6.21943 7.76289C6.39682 7.59388 6.63252 7.49973 6.87753 7.5H17.1225C17.3675 7.49973 17.6032 7.59388 17.7806 7.76289C17.958 7.9319 18.0635 8.16276 18.075 8.4075V8.4075Z"
                          fill="#395589"
                        ></path>
                        <path
                          d="M8.52002 10.8925C8.93423 10.8925 9.27002 10.5567 9.27002 10.1425C9.27002 9.72824 8.93423 9.39246 8.52002 9.39246C8.10581 9.39246 7.77002 9.72824 7.77002 10.1425C7.77002 10.5567 8.10581 10.8925 8.52002 10.8925Z"
                          fill="#395589"
                        ></path>
                        <path
                          d="M15.4801 10.8925C15.8943 10.8925 16.2301 10.5567 16.2301 10.1425C16.2301 9.72824 15.8943 9.39246 15.4801 9.39246C15.0659 9.39246 14.7301 9.72824 14.7301 10.1425C14.7301 10.5567 15.0659 10.8925 15.4801 10.8925Z"
                          fill="#395589"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </button>
                <div
                  cursor="unset"
                  class="Box-sc-15jsbqj-0 FlexBox-sc-vldgmo-0 kVaKSh efJeZe"
                >
                  <span
                    font-size="10px"
                    color="white"
                    font-weight="600"
                    class="Typography-sc-1nbqu5-0 hwGQQf"
                  >
                    3
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
