import '../styles/globals.css'
import "./../styles/header.css"
import 'react-loading-skeleton/dist/skeleton.css'
import { TechTestContext } from "../config/context";
import React, {useEffect, useState} from 'react'
import Header from "../component/Header";
import axiosInstance from '../config/axiosIntance';
function MyApp({ Component, pageProps }) {
  const [product, setProduct] = useState({
    products: [],
    search: "",
    loading: false

  })
  const handleGetProduct = async() => {
    try{

      setProduct(prev => {
        return {...prev, loading:true }
       })
      const res = await axiosInstance.get("/Product");
       if(res.status === 200){
        setProduct(prev => {
          return {...prev, products: res.data.records,  loading:false }
        })
      
       }
       
    }catch(e){
      console.log("e")
      setProduct(prev => {
        return {...prev, loading:false }
       })
    }
   

  }
  useEffect(() => {
    handleGetProduct()
   
  }, [])
  return<TechTestContext.Provider value={{product, setProduct}} >
     <Header />
    <Component {...pageProps} />

     </TechTestContext.Provider>
}

export default MyApp
