import React, { useEffect } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import {useDispatch, useSelector} from "react-redux"
import { fetchProductsByFilters } from '../redux/slices/productSlice'
import axios from 'axios'
import { useState } from 'react'




// const placeholderProducts = [
//   {
//     _id: 1,
//     name: "product 2",
//     price: 1000,
//     images: [
//       {
//         url: "https://picsum.photos/500/200/?random=1",
//         altText: "product 1",
//       },
//     ],
//   },
//   {
//     _id: 2,
//     name: "product 2",
//     price: 1000,
//     images: [
//       {
//         url: "https://picsum.photos/500/300/?random=1",
//         altText: "product 1",
//       },
//     ],
//   },
//   {
//     _id: 3,
//     name: "product 3",
//     price: 1000,
//     images: [
//       {
//         url: "https://picsum.photos/500/400/?random=1",
//         altText: "product 1",
//       },
//     ],
//   },
//   {
//     _id: 4,
//     name: "product ",
//     price: 1000,
//     images: [
//       {
//         url: "https://picsum.photos/500/500/?random=7",
//         altText: "product 1",
//       },
//     ],
//   },
//   {
//     _id: 5,
//     name: "product 5",
//     price: 1000,
//     images: [
//       {
//         url: "https://picsum.photos/500/500/?random=2",
//         altText: "product 1",
//       },
//     ],
//   },
// ];
  


const Home = () => {
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products)
  const [bestSellerProduct,setBestSellerProduct]=useState(null)

  useEffect(() => {
    // Fetch products for a specific collection
    fetchProductsByFilters({
      gender:"Woman",
      category:"Bottom Wear",
      limit:8,
    });
    // Fetch best seller product
    const fetchBestSeller=async()=>{
      try {
        const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data)
      }
      catch(error){
        console.error(error);
        

      }

    }
    fetchBestSeller()
  }, [dispatch])
  
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      {/* Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
        {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>):(
          <p className='text-center'>Loading best seller product</p>
        )}
      </h2>
      
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wear's for Woman
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  )
}

export default Home