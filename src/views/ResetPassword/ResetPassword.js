import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Notification from "../../component/notification/Notification";
// import { userSigIn } from "../../config/api/UserAuthAPI";
import image from "../../images/Forgot-Password-UAQ.png";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import SearchBar from "../../component/Search_Bar/SearchBar";
import { LoadingOutlined } from "@ant-design/icons";
import { resetPassword } from "../../config/api/auth";

export default function ResetPassword() {
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  //   const drawerState = state.DrawerReducer.State;
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password != cpassword) {
      Notification(
        "Reset Password",
        "Password and Confirm Password Must Match",
        "Error"
      );
      setLoading(false);
    } else {
      try {
        const model = {
          resetLink: token,
          newPass: password,
        };
        var res = await resetPassword(model);
        if (res.status == 201) {
          Notification("Reset Password", res.data.message, "Success");
          history.push("/");
          return;
        } else {
          Notification("Reset Password", res.data.message, "Error");
          return;
        }
      } catch (err) {
        Notification("Reset Password", "Something went wrong", "Error");
        setLoading(false);
      }
    }
  };
  useEffect(async () => {
    // const pathName = window.location.href
    // const codeTest = pathName.split("&code=")[1]
    // setCode(codeTest)
  }, []);

  return (
    <section
      id="signin"
      className="hero d-flex align-items-center"
      //   style={{ padding: "90px 0px 0px 0px" }}
    >
      <div className="container-fluid">
        <div
          className="row"
          //   className={
          //     t("lang") === "en"
          //       ? drawerState.Drawer
          //         ? "row offset-2"
          //         : "row offset-xl-1"
          //       : drawerState.Drawer
          //       ? "row onset-2"
          //       : "row onset-xl-1"
          //   }
        >
          <SearchBar />
          <div
            style={{
              minHeight: "83vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="row sectionShadow login_container">
              <div className="col-md-9 col-lg-5 col-xl-5 col-12 align-items-center justify-content-center align-self-center">
                <img src={image} className="img-fluid" />
              </div>
              <div className="col-md-9 col-lg-6 col-xl-5 col-12 formSection">
                <h1
                  style={{
                    fontSize: 25,
                    marginLeft: "8px",
                    marginBottom: "18px",
                  }}
                >
                  Reset Password
                </h1>
                <div className="col-lg-12">
                  <form onSubmit={handleResetPassword}>
                    <div className="col-lg-12">
                      <div className="col-lg-12">
                        <label className="labeltext">Password</label>
                        <input
                          required
                          type="password"
                          placeholder="*********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="FormInput"
                          style={{ borderRadius: "10px", background: "#fff" }}
                        />
                      </div>
                      <div className="col-lg-12">
                        <label className="labeltext">Confirm Password</label>
                        <input
                          required
                          type="password"
                          placeholder="*********"
                          value={cpassword}
                          onChange={(e) => setCPassword(e.target.value)}
                          className="FormInput"
                          style={{ borderRadius: "10px", background: "#fff" }}
                        />
                      </div>
                      <div
                        className="col-lg-12 text-center"
                        style={{ margin: "20px 0px" }}
                      >
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
                              <span>Reset Password</span>
                              <i className="bi bi-arrow-right arrow_right"></i>
                            </>
                          </button>
                        )}
                        {/* </Form.Item> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
