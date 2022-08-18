import React, { useState } from "react";
import Link from "next/link";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
const ProductCard = (props) => {
  const { product, isview = false } = props;
  const [quatity, setQuantity] = useState(0);
  const [current, setCurrent] = useState(0);
 
  const nextSlide = () => {
    setCurrent(
      current === (product ? product?.fields.pictures.length : 0) - 1
        ? 0
        : current + 1
    );
   };
  const prevSlide = () => {
    setCurrent(
      current === 0
        ? (product ? product?.fields.pictures.length : 0) - 1
        : current - 1
    );
  };
  const handleQuantity = (val) => {
    setQuantity((prev) => {
      if (prev == 0 && val < 0) {
        return 0;
      }
     return prev += val;
    });
  };
  return (
    <div className="current-search-container">
      <div className="w-100 current-search-container">
        <div className="current-search-btn current-search-btn-left pointer">
          <AiOutlineArrowLeft size={12} onClick={prevSlide} />
        </div>
        {product?.fields?.pictures?.map((dt, index) => {
          if (index === current) {
            return (
              <div className="w-100" key={index}>
                <div className="current-img-container">
                  <img alt="current" src={dt.url} />
                </div>
              </div>
            );
          }

          return null;
        })}
        <div className="current-search-btn  current-search-btn-right pointer">
          <AiOutlineArrowRight size={12} onClick={nextSlide} />
        </div>
      </div>
      <div className="w-100">
        <div className="current-search-name pointer">
          <Link href={`/${product?.id}`} className="pointer">
            <div className="pointer current-search-name">
              {product?.fields.Name}
            </div>
          </Link>
        </div>
        <div className="current-search-price">
          ₱. <div style={{ marginLeft: "5px" }}> {product?.fields.Price}</div>
        </div>
        <div className="current-search-category">
          <MdOutlineCategory />{" "}
          <div style={{ marginLeft: "5px" }}> {product?.fields.Brand}</div>
        </div>
        <div className="current-search-description">
          " {product?.fields.Description} "
        </div>
        {!isview ? (
          <Link href={`/${product?.id}`} className="pointer ">
            <div className="shop-btn">SHOP NOW</div>
          </Link>
        ) : (
          <React.Fragment>
            <div>Quantity</div>
            <div className="buy-container">
              <div className="qty-container">
                <div className="minus-btn btn-prd" onClick={() => handleQuantity(-1)}>
                  <AiOutlineMinus />
                </div>
                <div className="value-btn btn-prd">{quatity}</div>
                <div className="add-btn btn-prd" onClick={() =>handleQuantity(+1)}>
                  <AiOutlinePlus />
                </div>
              </div>

              <div className="cart-btn btn-prd">
                <AiOutlineShoppingCart />
              </div>
              <div className="heart-btn btn-prd">
                <AiOutlineHeart />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
