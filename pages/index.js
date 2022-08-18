import React, { useContext, useEffect } from "react"
import AOS from "aos";
import styles from '../styles/Home.module.css'

import axiosInstance from "../config/axiosIntance";

import LandingProduct from "../component/LandingProduct";
import ProductCard from "../component/ProductCard";
import { TechTestContext } from "../config/context";

const Home = () => {
  const {product, setProduct} = useContext(TechTestContext);
  const handleGetProduct = async() => {
    try{
      setProduct(prev => {
        return {...prev, loading:true }
       })
      const res = await axiosInstance.get("/Product");
    
        setProduct(prev => {
          return {...prev, products: res.data.records,  loading:false }
        })
      
    }catch(e){
      setProduct(prev => {
        return {...prev, loading:false }
       })
    }
   

  }
  useEffect(() => {
    handleGetProduct();
    AOS.init();
  }, []);
  return (
    
    <div className={styles.container}>
     
      <LandingProduct />

      <div className="w-100 new-arrival-text">
        <div className="arrival">New Arrivals</div>
        <div className="border-new"/>
      </div>
      <div className="products-container">
        {
          product.products.map((prd, key) => {
            return <div className='card-product'  data-aos={`${key % 2 === 0 ? 'fade-right' :'fade-left' }`}><ProductCard product={prd} key={key}/></div>
          })
        }
      </div>
    </div>
 
  )
}


export default Home;