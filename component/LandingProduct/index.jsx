import React, { useContext, useEffect, useState } from "react";
import { TechTestContext } from "../../config/context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";
const LandingProduct = () => {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    const length =  (productFirst() ? productFirst()?.fields.pictures.length : 0);
    console.log("length", length);
    setCurrent(
     current == length ? 0 : current + 1
    );

  };
  const {
    product: { products, loading = false },
  } = useContext(TechTestContext);
  const productFirst = () => {
    if (Array.isArray(products) && products.length) {
      return products[0];
    }
    return null;
  };
  const Loader = () => {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton height={"100%"} />
      </SkeletonTheme>
    );
  };
  useEffect(() => {
    setTimeout(() => {
      nextSlide()
    }, 1000)
  }, []);
  useEffect(() => {
    setTimeout(() => {
      nextSlide()
    }, 2000)

  }, [current])
  return (
    <div className="landing-page">
      {loading ? (
        <Loader />
      ) : productFirst() ? (
          <React.Fragment>
          <div className="lading-page-product-info">
            <div className="p-name">
              {" "}
              {productFirst().fields.Brand} / {productFirst().fields.Name}
            </div>
            <div className="p-description">
              {" "}
              {productFirst().fields.Description.substring(0, 102)}
            </div>
            <Link href={`/${productFirst()?.id}`} className="pointer ">
              <div className="shop-btn">SHOP NOW</div>
            </Link>
          </div>
          <div className="lading-page-product">
            {
              productFirst().fields.pictures.map((dt, index) => {
                if(index == current){
                  return <img src={dt.url} alt="pic" className="pic-landing fade-in" key={index}/>
                }
              return null
              })
            }
          </div>
          </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default LandingProduct;
