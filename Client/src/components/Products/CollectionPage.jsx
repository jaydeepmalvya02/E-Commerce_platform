import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "./FilterSidebar";
import SortOptions from "./SortOptions";
import ProductGrid from "./ProductGrid"
const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close  sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    //   Add event listener for click
    document.addEventListener("mousedown", handleClickOutside);

    // clean event listener
    return()=>{

      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
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
      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button 
      onClick={toggleSidebar}
      className="lg:hidden border p-2 flex justify-center items-center ">
        <FaFilter className="mr-2" />Filters
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* Sort Option */}
        <SortOptions/>
        {/* Product Grid */}
        <ProductGrid products={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
