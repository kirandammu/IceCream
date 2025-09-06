import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import {HiOutlineStar, HiStar} from 'react-icons/hi2'
import { useContext } from "react";
import { store } from "../context/Context";

const Item = ({ image, name, description, id, price }) => {

  const {AddCart, RemoveCart, cartItem} = useContext(store)
  return (
    <div className="m-3 flex flex-col w-60 md:w-52 rounded shadow-2xl border border-gray-400 overflow-hidden">
      <div className="relative">
        <img src={image} alt="" className="rounded-t  w-52 h-54 overflow-hidden" />
        <div className="absolute bottom-2 right-2">
          {!cartItem?.[id] ? (
            <img
              src={assets.add_icon_white}
                onClick={()=>AddCart(id)}
              className="w-6 cursor-pointer m-0.5 rounded-full border-blue-500 border"
            />
          ) : (
            <div className="bg-white rounded-2xl flex items-center">
              <img
                src={assets.remove_icon_red}
                onClick={()=>RemoveCart(id)}
                className="w-5 cursor-pointer m-0.5 rounded-full border-white border"
              />
              <p className="px-0.5">{cartItem[id]}</p>
              <img
                src={assets.add_icon_green}
                onClick={()=>AddCart(id)}
                className="w-5 cursor-pointer m-0.5 rounded-full border-white border"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-1">
        <div className="flex justify-between items-center">
          <p className="text-black font-medium line-clamp-1">{name}</p>
          <div className="flex items-center mr-2">
            <HiStar className="text-blue-500 w-3" />
            <HiStar className="text-blue-500 w-3" />
            <HiStar className="text-blue-500 w-3" />
            <HiStar className="text-blue-500 w-3" />
            <HiOutlineStar  className="text-blue-500 w-3"/>
          </div>
        </div>
        <p className="text-xs text-gray-600 h-8 line-clamp-2">{description}</p>
        <p className="text-[purple] font-bold">₹{price}</p>
      </div>
    </div>
  );
};

export default Item;
