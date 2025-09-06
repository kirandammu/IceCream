import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { store } from '../context/Context';
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { BsFillBookmarkDashFill } from "react-icons/bs";



const Seller = () => {

    const {Logout} = useContext(store)

    const sidebarLinks = [
        { name: "Add Products", path: "/seller", icon: <MdLibraryAdd /> },
        { name: "Products List", path: "/seller/list", icon: <MdLibraryAddCheck />
 },
        { name: "Orders", path: "/seller/orders", icon: <BsFillBookmarkDashFill />
},
    ];

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
                <Link to={'/'}>
                <div className='text-2xl text-bold'>
        <p className='text-blue-600'>Ice <span className='text-purple-700 border-b-2'>Creams</span></p>
      </div></Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Dammu</p>
                    <button onClick={()=>Logout()} className='bg-[red] cursor-pointer text-white px-5 py-1 rounded'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-48 w-16 border-r h-[600px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <NavLink to={item.path} key={item.name} end={item.path === '/seller'}
                        className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-gray-500/10 border-blue-500 text-[blue]"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        <p>{item.icon}</p>
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div> 
            <Outlet />
            </div>
        </>
    );
};

export default Seller
