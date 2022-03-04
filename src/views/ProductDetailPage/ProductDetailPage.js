import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../config/api/products";
import Notification from "../../component/notification/Notification";
import { BsHeart } from "react-icons/bs";
import { RiStarSFill } from "react-icons/ri";
import { addToCart } from "../../store/actions";
import { useDispatch } from "react-redux";
export default function ProductDetailPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const [addToWishList, setAddToWishList] = useState(true);
  const dispatch = useDispatch()
  const getProductDetails = async () => {
    try {
      const res = await getProductDetail(productId);
      if (res.status == 200) {
        setProductDetail(res.data.product);
      } else {
        Notification("Product Detail", "Something went wrong", "Error");
      }
    } catch (err) {
      Notification("Product Detail", "Something went wrong", "Error");
    }
  };
  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  window.addEventListener("resize", slideImage);
  // const Active = (key) => {
  //     var img = document.getElementById("productDescImg");
  //     img.src = key.target.src;
  //   };
  useEffect(() => {
    getProductDetails();
  }, []);
  // console.log(productDetail);
  return (
    <>
      {productDetail != "" ? <div class="card-wrapper">
        <div class="card">
          {/* <!-- card left --> */}
          <div class="product-imgs">
            <div class="img-display">
              <div class="img-showcase">
              {productDetail.productPictures.map((thumb, index) => (
                <img
                key={thumb.avatar}
                    src={thumb.avatar}
                    alt={thumb.avatar}
              />
              ))}
                {/* <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                  alt="shoe image"
                />
                <img
                  src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                  alt="shoe image"
                /> */}
              </div>
            </div>
            <div class="img-select">
            {productDetail.productPictures.map((thumb, index) => (
              <div class="img-item">
              <a href="#" data-id={index+1}>
                <img
                  key={thumb.avatar}
                  src={thumb.avatar}
                  alt={thumb.avatar}
                />
              </a>
            </div>
            ))}
              {/* <div class="img-item">
                <a href="#" data-id="1">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_1.jpg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div class="img-item">
                <a href="#" data-id="2">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div class="img-item">
                <a href="#" data-id="3">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg"
                    alt="shoe image"
                  />
                </a>
              </div>
              <div class="img-item">
                <a href="#" data-id="4">
                  <img
                    src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg"
                    alt="shoe image"
                  />
                </a>
              </div> */}
            </div>
          </div>
          {/* <!-- card right --> */}
          <div class="product-content">
            <h2 class="product-title">{productDetail.name}</h2>
            <a href="#" class="product-link">
              visit nike store
            </a>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span>4.7(21)</span>
            </div>

            <div class="product-price">
              <p class="last-price">
                Old Price: <span>$ {productDetail.price}</span>
              </p>
              <p class="new-price">
                New Price: <span>$249.00 (5%)</span>
              </p>
            </div>

            <div class="product-detail">
              <h2>about this item: </h2>
              <p>
                {productDetail.description}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, perferendis eius. Dignissimos, labore suscipit.
                Unde.
              </p>
              <ul>
                <li>
                  Color: <span>Black</span>
                </li>
                <li>
                  Available: <span>in stock</span>
                </li>
                <li>
                  Category: <span>Shoes</span>
                </li>
                <li>
                  Shipping Area: <span>All over the world</span>
                </li>
                <li>
                  Shipping Fee: <span>Free</span>
                </li>
              </ul>
            </div>

            <div class="purchase-info">
              <input type="number" min="0" value="1" />
              <button type="button" class="btn" onClick={() => {
                  const { _id, name, price, createdBy } = productDetail;
                  const img = productDetail.productPictures[0].avatar;
                  dispatch(addToCart({ _id, name, price, img , createdBy}));
                  // props.history.push(`/cart`);
                }}>
                Add to Cart <i class="fas fa-shopping-cart"></i>
              </button>
              <button type="button" class="btn">
                Compare
              </button>
            </div>

            <div class="social-links">
              <p>Share At: </p>
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a href="#">
                <i class="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div> : null}
    </>
  );
}
