import React, {useEffect, useState} from "react";
import {Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import Notification from "../../component/notification/Notification";
import {addOrder} from "../../config/api/order";
import {useHistory} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {CountryDropdown, RegionDropdown,} from "react-country-region-selector";
import {getCartItems} from "../../config/api/cart";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [cityDistrictTown, setCityDistrictTown] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const history = useHistory();
  const handleCheckout = async (e) => {
    e.preventDefault();

    const order_items = cartItems.map((data) => ({
      product_vendor_id: data.product_vendor_id,
      product_id: data.product_id,
      payable_price: data.payable_price,
      purchased_qty: data.qty,
    }));
    const payload = {
      order_items,
      user_address: {
        name: name,
        mobile_number: mobileNumber,
        pin_code: pinCode,
        address: address,
        city: cityDistrictTown,
        state: state,
        country: country,
      }
    };
    // console.log(payload)
    // console.log(payload)
    setLoading(true);
    try {
      if (cartItems.length != 0) {
        const res = await addOrder(payload);
        console.log(res)
        if (res.status === 201) {

          Notification("Order Department", res.data.message, "Success");
          history.push(`/invoice/${res.data.data.id}`);
          setLoading(false);
          return;
        } else {
          setLoading(false);
          Notification("Order Department", res.data.message, "Error");
          return;
        }
      } else {
        setLoading(false);
        Notification("Order Department", "Your cart is empty", "Error");
      }
    } catch (err) {
      setLoading(false);
      Notification("Order Department", "Something went wrong", "Error");
    }
  };
  const getCartItem = async () => {
    try {
      const res = await getCartItems();
      if (res.status == 200) {
        setCartItems(res.data.data);
        return;
      } else {
        Notification("Cart", res.data.message, "Error");
        return;
      }
    } catch (err) {
      Notification("Cart", "Something went wrong", "Error");
    }
  };
  useEffect(()=> {
    getCartItem()
  })
  return (
    <div>
      {/* <!-- Start Checkout --> */}
      <section class="shop checkout section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-12">
              <div class="checkout-form">
                <h2>Make Your Checkout Here</h2>
                <p>Please register in order to checkout more quickly</p>
                {/* <!-- Form --> */}
                <form onSubmit={handleCheckout}>
                  <div class="row">
                    <div class="col-lg-8 col-12">
                      <div class="row">
                        <div class="col-lg-6 col-md-6 col-12">
                          <div class="form-group">
                            <label>
                              Name<span>*</span>
                            </label>
                            {/* <Form.Item name="name"> */}
                            <input
                              required
                              type="text"
                              placeholder=""
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px",
                              }}
                            />
                            {/* </Form.Item> */}
                          </div>
                        </div>
                        {/* <div class="col-lg-6 col-md-6 col-12">
                        <div class="form-group">
                          <label>
                            Email Address<span>*</span>
                          </label>
                          <Form.Item name="email">
                            <input
                              type="email"
                              placeholder=""
                              required
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div> */}
                        <div class="col-lg-6 col-md-6 col-12">
                          <div class="form-group">
                            <label>
                              Phone Number<span>*</span>
                            </label>
                            {/* <Form.Item name="mobileNumber"> */}
                            <input
                              required
                              type="number"
                              placeholder=""
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              required
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px",
                              }}
                            />
                            {/* </Form.Item> */}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div
                            class="form-group"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <label>
                              Country<span>*</span>
                            </label>
                            {/* <Form.Item name="country"> */}
                            {/* <select
                              required
                              id="country"
                              required
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px"
                              }}
                            >
                              <option value="">None</option>
                              <option value="AF">Afghanistan</option>
                              <option value="AX">Åland Islands</option>
                              <option value="AL">Albania</option>
                              <option value="DZ">Algeria</option>
                              <option value="AS">American Samoa</option>
                              <option value="AD">Andorra</option>
                              <option value="AO">Angola</option>
                              <option value="AI">Anguilla</option>
                              <option value="AQ">Antarctica</option>
                              <option value="AG">Antigua and Barbuda</option>
                              <option value="AR">Argentina</option>
                              <option value="AM">Armenia</option>
                              <option value="AW">Aruba</option>
                              <option value="AU">Australia</option>
                              <option value="AT">Austria</option>
                              <option value="AZ">Azerbaijan</option>
                              <option value="BS">Bahamas</option>
                              <option value="BH">Bahrain</option>
                              <option value="BD">Bangladesh</option>
                              <option value="BB">Barbados</option>
                              <option value="BY">Belarus</option>
                              <option value="BE">Belgium</option>
                              <option value="BZ">Belize</option>
                              <option value="BJ">Benin</option>
                              <option value="BM">Bermuda</option>
                              <option value="BT">Bhutan</option>
                              <option value="BO">Bolivia</option>
                              <option value="BA">
                                Bosnia and Herzegovina
                              </option>
                              <option value="BW">Botswana</option>
                              <option value="BV">Bouvet Island</option>
                              <option value="BR">Brazil</option>
                              <option value="IO">
                                British Indian Ocean Territory
                              </option>
                              <option value="VG">
                                British Virgin Islands
                              </option>
                              <option value="BN">Brunei</option>
                              <option value="BG">Bulgaria</option>
                              <option value="BF">Burkina Faso</option>
                              <option value="BI">Burundi</option>
                              <option value="KH">Cambodia</option>
                              <option value="CM">Cameroon</option>
                              <option value="CA">Canada</option>
                              <option value="CV">Cape Verde</option>
                              <option value="KY">Cayman Islands</option>
                              <option value="CF">
                                Central African Republic
                              </option>
                              <option value="TD">Chad</option>
                              <option value="CL">Chile</option>
                              <option value="CN">China</option>
                              <option value="CX">Christmas Island</option>
                              <option value="CC">
                                Cocos [Keeling] Islands
                              </option>
                              <option value="CO">Colombia</option>
                              <option value="KM">Comoros</option>
                              <option value="CG">Congo - Brazzaville</option>
                              <option value="CD">Congo - Kinshasa</option>
                              <option value="CK">Cook Islands</option>
                              <option value="CR">Costa Rica</option>
                              <option value="CI">Côte d’Ivoire</option>
                              <option value="HR">Croatia</option>
                              <option value="CU">Cuba</option>
                              <option value="CY">Cyprus</option>
                              <option value="CZ">Czech Republic</option>
                              <option value="DK">Denmark</option>
                              <option value="DJ">Djibouti</option>
                              <option value="DM">Dominica</option>
                              <option value="DO">Dominican Republic</option>
                              <option value="EC">Ecuador</option>
                              <option value="EG">Egypt</option>
                              <option value="SV">El Salvador</option>
                              <option value="GQ">Equatorial Guinea</option>
                              <option value="ER">Eritrea</option>
                              <option value="EE">Estonia</option>
                              <option value="ET">Ethiopia</option>
                              <option value="FK">Falkland Islands</option>
                              <option value="FO">Faroe Islands</option>
                              <option value="FJ">Fiji</option>
                              <option value="FI">Finland</option>
                              <option value="FR">France</option>
                              <option value="GF">French Guiana</option>
                              <option value="PF">French Polynesia</option>
                              <option value="TF">
                                French Southern Territories
                              </option>
                              <option value="GA">Gabon</option>
                              <option value="GM">Gambia</option>
                              <option value="GE">Georgia</option>
                              <option value="DE">Germany</option>
                              <option value="GH">Ghana</option>
                              <option value="GI">Gibraltar</option>
                              <option value="GR">Greece</option>
                              <option value="GL">Greenland</option>
                              <option value="GD">Grenada</option>
                              <option value="GP">Guadeloupe</option>
                              <option value="GU">Guam</option>
                              <option value="GT">Guatemala</option>
                              <option value="GG">Guernsey</option>
                              <option value="GN">Guinea</option>
                              <option value="GW">Guinea-Bissau</option>
                              <option value="GY">Guyana</option>
                              <option value="HT">Haiti</option>
                              <option value="HM">
                                Heard Island and McDonald Islands
                              </option>
                              <option value="HN">Honduras</option>
                              <option value="HK">Hong Kong SAR China</option>
                              <option value="HU">Hungary</option>
                              <option value="IS">Iceland</option>
                              <option value="IN">India</option>
                              <option value="ID">Indonesia</option>
                              <option value="IR">Iran</option>
                              <option value="IQ">Iraq</option>
                              <option value="IE">Ireland</option>
                              <option value="IM">Isle of Man</option>
                              <option value="IL">Israel</option>
                              <option value="IT">Italy</option>
                              <option value="JM">Jamaica</option>
                              <option value="JP">Japan</option>
                              <option value="JE">Jersey</option>
                              <option value="JO">Jordan</option>
                              <option value="KZ">Kazakhstan</option>
                              <option value="KE">Kenya</option>
                              <option value="KI">Kiribati</option>
                              <option value="KW">Kuwait</option>
                              <option value="KG">Kyrgyzstan</option>
                              <option value="LA">Laos</option>
                              <option value="LV">Latvia</option>
                              <option value="LB">Lebanon</option>
                              <option value="LS">Lesotho</option>
                              <option value="LR">Liberia</option>
                              <option value="LY">Libya</option>
                              <option value="LI">Liechtenstein</option>
                              <option value="LT">Lithuania</option>
                              <option value="LU">Luxembourg</option>
                              <option value="MO">Macau SAR China</option>
                              <option value="MK">Macedonia</option>
                              <option value="MG">Madagascar</option>
                              <option value="MW">Malawi</option>
                              <option value="MY">Malaysia</option>
                              <option value="MV">Maldives</option>
                              <option value="ML">Mali</option>
                              <option value="MT">Malta</option>
                              <option value="MH">Marshall Islands</option>
                              <option value="MQ">Martinique</option>
                              <option value="MR">Mauritania</option>
                              <option value="MU">Mauritius</option>
                              <option value="YT">Mayotte</option>
                              <option value="MX">Mexico</option>
                              <option value="FM">Micronesia</option>
                              <option value="MD">Moldova</option>
                              <option value="MC">Monaco</option>
                              <option value="MN">Mongolia</option>
                              <option value="ME">Montenegro</option>
                              <option value="MS">Montserrat</option>
                              <option value="MA">Morocco</option>
                              <option value="MZ">Mozambique</option>
                              <option value="MM">Myanmar [Burma]</option>
                              <option value="NA">Namibia</option>
                              <option value="NR">Nauru</option>
                              <option value="NP">Nepal</option>
                              <option value="NL">Netherlands</option>
                              <option value="AN">Netherlands Antilles</option>
                              <option value="NC">New Caledonia</option>
                              <option value="NZ">New Zealand</option>
                              <option value="NI">Nicaragua</option>
                              <option value="NE">Niger</option>
                              <option value="NG">Nigeria</option>
                              <option value="NU">Niue</option>
                              <option value="NF">Norfolk Island</option>
                              <option value="MP">
                                Northern Mariana Islands
                              </option>
                              <option value="KP">North Korea</option>
                              <option value="NO">Norway</option>
                              <option value="OM">Oman</option>
                              <option value="PK">Pakistan</option>
                              <option value="PW">Palau</option>
                              <option value="PS">
                                Palestinian Territories
                              </option>
                              <option value="PA">Panama</option>
                              <option value="PG">Papua New Guinea</option>
                              <option value="PY">Paraguay</option>
                              <option value="PE">Peru</option>
                              <option value="PH">Philippines</option>
                              <option value="PN">Pitcairn Islands</option>
                              <option value="PL">Poland</option>
                              <option value="PT">Portugal</option>
                              <option value="PR">Puerto Rico</option>
                              <option value="QA">Qatar</option>
                              <option value="RE">Réunion</option>
                              <option value="RO">Romania</option>
                              <option value="RU">Russia</option>
                              <option value="RW">Rwanda</option>
                              <option value="BL">Saint Barthélemy</option>
                              <option value="SH">Saint Helena</option>
                              <option value="KN">
                                Saint Kitts and Nevis
                              </option>
                              <option value="LC">Saint Lucia</option>
                              <option value="MF">Saint Martin</option>
                              <option value="PM">
                                Saint Pierre and Miquelon
                              </option>
                              <option value="VC">
                                Saint Vincent and the Grenadines
                              </option>
                              <option value="WS">Samoa</option>
                              <option value="SM">San Marino</option>
                              <option value="ST">
                                São Tomé and Príncipe
                              </option>
                              <option value="SA">Saudi Arabia</option>
                              <option value="SN">Senegal</option>
                              <option value="RS">Serbia</option>
                              <option value="SC">Seychelles</option>
                              <option value="SL">Sierra Leone</option>
                              <option value="SG">Singapore</option>
                              <option value="SK">Slovakia</option>
                              <option value="SI">Slovenia</option>
                              <option value="SB">Solomon Islands</option>
                              <option value="SO">Somalia</option>
                              <option value="ZA">South Africa</option>
                              <option value="GS">South Georgia</option>
                              <option value="KR">South Korea</option>
                              <option value="ES">Spain</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="SD">Sudan</option>
                              <option value="SR">Suriname</option>
                              <option value="SJ">
                                Svalbard and Jan Mayen
                              </option>
                              <option value="SZ">Swaziland</option>
                              <option value="SE">Sweden</option>
                              <option value="CH">Switzerland</option>
                              <option value="SY">Syria</option>
                              <option value="TW">Taiwan</option>
                              <option value="TJ">Tajikistan</option>
                              <option value="TZ">Tanzania</option>
                              <option value="TH">Thailand</option>
                              <option value="TL">Timor-Leste</option>
                              <option value="TG">Togo</option>
                              <option value="TK">Tokelau</option>
                              <option value="TO">Tonga</option>
                              <option value="TT">Trinidad and Tobago</option>
                              <option value="TN">Tunisia</option>
                              <option value="TR">Turkey</option>
                              <option value="TM">Turkmenistan</option>
                              <option value="TC">
                                Turks and Caicos Islands
                              </option>
                              <option value="TV">Tuvalu</option>
                              <option value="UG">Uganda</option>
                              <option value="UA">Ukraine</option>
                              <option value="AE">United Arab Emirates</option>
                              <option value="US">United Kingdom</option>
                              <option value="UY">Uruguay</option>
                              <option value="UM">
                                U.S. Minor Outlying Islands
                              </option>
                              <option value="VI">U.S. Virgin Islands</option>
                              <option value="UZ">Uzbekistan</option>
                              <option value="VU">Vanuatu</option>
                              <option value="VA">Vatican City</option>
                              <option value="VE">Venezuela</option>
                              <option value="VN">Vietnam</option>
                              <option value="WF">Wallis and Futuna</option>
                              <option value="EH">Western Sahara</option>
                              <option value="YE">Yemen</option>
                              <option value="ZM">Zambia</option>
                              <option value="ZW">Zimbabwe</option>
                            </select> */}
                            <CountryDropdown
                            required
                            style={{
                              width: "100%",
                              height: "45px",
                              lineHeight: "50px",
                              padding: "0px 20px",
                              color: "#333",
                              border: "none",
                              background: "#F6F7FB",
                              margin: "15px 0px"
                            }}
                              value={country}
                              onChange={(val) => setCountry(val)}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div
                            class="form-group"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <label>
                              State / Divition<span>*</span>
                            </label>
                            <RegionDropdown
                            required
                            style={{
                              width: "100%",
                              height: "45px",
                              lineHeight: "50px",
                              padding: "0px 20px",
                              color: "#333",
                              border: "none",
                              background: "#F6F7FB",
                              margin: "15px 0px"
                            }}
                              country={country}
                              value={state}
                              onChange={(val) => setState(val)}
                            />
                            {/* <Form.Item name="state"> */}
                            {/* <select
                              required
                              id="state-province"
                              required="required"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px"
                              }}
                            >
                              <option value="">None</option>
                              <option value="New Yourk">New Yourk</option>
                              <option value="Los Angeles">Los Angeles</option>
                              <option value="Chicago">Chicago</option>
                              <option value="Houston">Houston</option>
                              <option value="San Diego">San Diego</option>
                              <option value="Dallas">Dallas</option>
                              <option value="Charlotte">Charlotte</option>
                            </select> */}
                            {/* </Form.Item> */}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div
                            class="form-group"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <label>
                              City<span>*</span>
                            </label>
                            <input
                              required
                              type="text"
                              placeholder=""
                              value={cityDistrictTown}
                              onChange={(e) => setCityDistrictTown(e.target.value)}
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px",
                              }}
                            />
                            {/* <Form.Item name="cityDistrictTown"> */}
                            {/* <select
                              required
                              id="state-province"
                              required="required"
                              value={cityDistrictTown}
                              onChange={(e) =>
                                setCityDistrictTown(e.target.value)
                              }
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px",
                              }}
                            >
                              <option value="">None</option>
                              <option value="New Yourk">New Yourk</option>
                              <option value="Los Angeles">Los Angeles</option>
                              <option value="Chicago">Chicago</option>
                              <option value="Houston">Houston</option>
                              <option value="San Diego">San Diego</option>
                              <option value="Dallas">Dallas</option>
                              <option value="Charlotte">Charlotte</option>
                            </select> */}
                            {/* </Form.Item> */}
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div class="form-group">
                            <label>
                              Postal Code<span>*</span>
                            </label>
                            {/* <Form.Item name="pinCode"> */}
                            <input
                              type="number"
                              name="post"
                              required
                              placeholder=""
                              value={pinCode}
                              onChange={(e) => setPinCode(e.target.value)}
                             
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px",
                              }}
                            />
                            {/* </Form.Item> */}
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-12">
                          <div class="form-group">
                            <label>
                              Address<span>*</span>
                            </label>
                            {/* <Form.Item name="address"> */}
                            <textarea
                              required
                              type="text"
                              name="address"
                              placeholder=""
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                height: "100px",
                                margin: "15px 0px",
                              }}
                            />
                            {/* </Form.Item> */}
                          </div>
                        </div>
                        {/* <div class="col-lg-12 col-md-12 col-12">
                        <div class="form-group">
                          <label>
                            Address Line 2<span>*</span>
                          </label>
                          <Form.Item name="address2">
                            <input
                              type="text"
                              name="address"
                              placeholder=""
                              required
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </div> */}
                        {/* <div class="col-lg-6 col-md-6 col-12">
                        <div
                          class="form-group"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <label>
                            Company<span>*</span>
                          </label>
                          <select
                            name="company_name"
                            id="company"
                            required
                            style={{
                              width: "100%",
                              height: "45px",
                              lineHeight: "50px",
                              padding: "0px 20px",
                              color: "#333",
                              border: "none",
                              background: "#F6F7FB",
                            }}
                          >
                            <option value="company" selected="selected">
                              Microsoft
                            </option>
                            <option>Apple</option>
                            <option>Xaiomi</option>
                            <option>Huawer</option>
                            <option>Wpthemesgrid</option>
                            <option>Samsung</option>
                            <option>Motorola</option>
                          </select>
                        </div>
                      </div> */}
                        {/* <div class="col-12">
										<div class="form-group create-account">
											<input id="cbox" type="checkbox"/>
											<label>Create an account?</label>
										</div>
									</div> */}
                      </div>
                    </div>
                    <div class="col-lg-4 col-12">
                      <div class="order-details">
                        {/* <!-- Order Widget --> */}
                        <div class="single-widget">
                          <h2>CART TOTALS</h2>
                          <div class="content">
                            <ul>
                              <li>
                                Sub Total
                                <span>
                                  $
                                  {Object.keys(cart.cartItems).reduce(
                                    (totalPrice, key) => {
                                      const { price, qty } =
                                        cart.cartItems[key];
                                      return totalPrice + price * qty;
                                    },
                                    0
                                  )}
                                </span>
                              </li>
                              <li>
                                (+) Shipping<span>$00.00</span>
                              </li>
                              <li class="last">
                                Total
                                <span>
                                  $
                                  {Object.keys(cart.cartItems).reduce(
                                    (totalPrice, key) => {
                                      const { price, qty } =
                                        cart.cartItems[key];
                                      return totalPrice + price * qty;
                                    },
                                    0
                                  )}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {/* <!--/ End Order Widget -->
							<!-- Order Widget --> */}
                        <div class="single-widget">
                          <h2>Payments</h2>
                          <div class="content" style={{ padding: "10px 30px" }}>
                            <label>
                              Payment Method<span>*</span>
                            </label>
                            {/* <Form.Item name="payment"> */}
                            <select
                              required
                              id="state-province"
                              required="required"
                              value={payment}
                              onChange={(e) => setPayment(e.target.value)}
                              style={{
                                width: "100%",
                                height: "45px",
                                lineHeight: "50px",
                                padding: "0px 20px",
                                color: "#333",
                                border: "none",
                                background: "#F6F7FB",
                                margin: "15px 0px",
                              }}
                            >
                              <option value="">None</option>
                              <option value="cod">Cash On Delivery</option>
                            </select>
                            {/* </Form.Item> */}
                            {/* <label class="checkbox-inline" for="1">
                        <input name="updates" id="1" type="checkbox" /> Check
                        Payments
                      </label>
                      <label class="checkbox-inline" for="2">
                        <input name="news" id="2" type="checkbox" /> Cash On
                        Delivery
                      </label>
                      <label class="checkbox-inline" for="3">
                        <input name="news" id="3" type="checkbox" /> PayPal
                      </label> */}
                          </div>
                        </div>
                        {/* <!--/ End Order Widget -->
							<!-- Payment Method Widget --> */}
                        <div class="single-widget payement">
                          <div class="content">
                            <img
                              src="assets/images/payment-method.png"
                              alt="#"
                            />
                          </div>
                        </div>
                        {/* <!--/ End Payment Method Widget -->
							<!-- Button Widget --> */}
                        <div class="single-widget get-button">
                          <div class="content">
                            <div
                              class="button"
                              // style={{ background: "#333333" }}
                            >
                              {/* <Form.Item> */}
                              {loading ? (
                                <button className="btn btn-get-started">
                                  <>
                                    <Spin indicator={antIcon} />
                                  </>
                                </button>
                              ) : (
                                <button
                                  className="btn btn-get-started"
                                  type="submit"
                                >
                                  Proceed To Checkout
                                </button>
                              )}
                              {/* </Form.Item> */}
                            </div>
                          </div>
                        </div>
                        {/* <!--/ End Button Widget --> */}
                      </div>
                    </div>
                  </div>
                </form>
                {/* <!--/ End Form --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--/ End Checkout --> */}
    </div>
  );
}
