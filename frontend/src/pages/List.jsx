import React, { useContext, useEffect, useState } from 'react';
import { assets, food_list } from '../assets/assets';
import { store } from '../context/Context';

const List =  () => {
    const {foodList, removeFood} = useContext(store)

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <div className='text-2xl font-medium mb-4'>
                    <p className='text-blue-600'>All <span className='text-purple-700 border-b-2'>Items</span></p>
                </div>
                <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Image</th>
                                <th className="px-4 py-3 font-semibold truncate">Name</th>
                                <th className="px-4 py-3 font-semibold truncate">Description</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {foodList?.map((item) => (
                                <tr key={item._id} className="border-t border-gray-500/20">
                                    <td className="px-4 py-3 flex items-center">
                                            <img src={item?.image} alt="Product" className="h-10 rounded" />
                                    </td>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3 w-72 ">{item.description}</td>
                                    <td className="px-4 py-3 max-sm:hidden">₹{item.price}</td>
                                    <td className="px-8 py-2 ">
                                        <img src={assets.remove_icon} className='w-4 cursor-pointer' alt="Remove" onClick={() => removeFood(item._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default List;