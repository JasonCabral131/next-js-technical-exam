import '../styles/globals.css'
import "./../styles/header.css"
import 'react-loading-skeleton/dist/skeleton.css'
import { TechTestContext } from "../config/context";
import React, {useState} from 'react'
import Header from "../component/Header";
function MyApp({ Component, pageProps }) {
  const [product, setProduct] = useState({
    products: [],
    search: "",
    loading: false

  })
  return<TechTestContext.Provider value={{product, setProduct}} >
     <Header />
    <Component {...pageProps} />

     </TechTestContext.Provider>
}

export default MyApp
