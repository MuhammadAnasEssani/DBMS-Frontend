import React from 'react'
import ShopCard from '../ShopCard/ShopCard'
import { RiStarSFill } from "react-icons/ri";

export default function Cart() {
  return (
    <>
      <div className="col-lg-12 slider">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 className="title">Cart</h1>
              </div>
              <div >
              <ShopCard
                name="Product Name"
                col={"3"}
                price="200"
                quantity="5"
              />
              </div>
            </div>
    </>
  )
}
