import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'


const placeholderProducts = [
  {
    _id: 1,
    name: "product 2",
    price: 1000,
    images: [
      {
        url: "https://picsum.photos/500/200/?random=1",
        altText: "product 1",
      },
    ],
  },
  {
    _id: 2,
    name: "product 2",
    price: 1000,
    images: [
      {
        url: "https://picsum.photos/500/300/?random=1",
        altText: "product 1",
      },
    ],
  },
  {
    _id: 3,
    name: "product 3",
    price: 1000,
    images: [
      {
        url: "https://picsum.photos/500/400/?random=1",
        altText: "product 1",
      },
    ],
  },
  {
    _id: 4,
    name: "product ",
    price: 1000,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=7",
        altText: "product 1",
      },
    ],
  },
  {
    _id: 5,
    name: "product 5",
    price: 1000,
    images: [
      {
        url: "https://picsum.photos/500/500/?random=2",
        altText: "product 1",
      },
    ],
  },
];
  


const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      {/* Best Seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>
        Best Seller
      </h2>
      <ProductDetails/>
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wear's for Woman
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </div>
  )
}

export default Home