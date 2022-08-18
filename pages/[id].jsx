import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from "./../config/axiosIntance";
const ProductInfo = () => {
  const {query: {id}} = useRouter();
  const [product, setProduct] = useState({product: '', loading: false});
  
  const handleGetProduct = async() => {
    try{
      setProduct(prev => {
        return {...prev, loading: true}
      })
      
      const res = await axios.get(`/product/${id}`);
      setProduct(prev => {
        return {...prev, loading: false}
      })
      if(res){
        setProduct(prev => {
          return {...prev, product: res}
        })
      }
    }catch(e){
      setProduct(prev => {
        return {...prev, loading: false}
      })
    }
  
    
  }
  useEffect(() => {handleGetProduct()}, [id])
  return (
    <div>{JSON.stringify(product.product)}</div>
  )
}

export default ProductInfo;