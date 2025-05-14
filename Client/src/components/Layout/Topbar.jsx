import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from 'react-icons/fi';

const Topbar = () => {
  return (
    <div className="  bg-gradient-to-r from-purple-500 to-purple-700 drop-shadow-md group-hover:from-purple-400 group-hover:to-purple-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span className="">
            We Ship World Wide - Fast and Reliable Shippping!
          </span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="#" className="hover:text-gray-300">
            <FiPhoneCall className="inline-block mr-2" />
            +91-7728487645
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar