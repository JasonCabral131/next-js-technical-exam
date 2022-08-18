import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "./../config/axiosIntance";
import ProductCard from "../component/ProductCard";
const ProductInfo = () => {
  const {
    query: { id },
  } = useRouter();
  const [product, setProduct] = useState({ product: "", loading: false });
  const [gallery, setGallery] = useState([]);
  const handleGetProduct = async () => {
    try {
      setProduct((prev) => {
        return { ...prev, loading: true };
      });

      const res = await axios.get(`/product/${id}`);
      setProduct((prev) => {
        return { ...prev, loading: false };
      });
      if (res.status === 200 && res.data) {
       

        setProduct((prev) => {
          return { ...prev, product: res.data };
        });
      }
    } catch (e) {
      console.log("error", e);
      setProduct((prev) => {
        return { ...prev, loading: false };
      });
    }
  };
  useEffect(() => {
    handleGetProduct();
  }, [id]);

  return (
    <div className="product-info-container">
      {product.product && !product.loading ? (
        <React.Fragment>
          <ProductCard product={product.product} isview={true} />
          
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ProductInfo;
