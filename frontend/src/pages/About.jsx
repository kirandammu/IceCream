import React from 'react'
import { FaClock, FaFacebookMessenger, FaMap, FaPhone } from 'react-icons/fa'
import {assets, menu_list} from '../assets/assets'
import Title from '../components/Title'
const About = () => {
  return (
    <div >
        <div className='flex items-end flex-col mx-auto w-60 py-8'>
              <Title text1={'Contact'} text2={'Us'}/>      
        </div> 
      <div className="flex justify-around">
        <div className="w-[400px]">
          <img src={assets.header_img} className='w-full shadow-2xl rounded-md ' />
        </div>
        <div className="flex flex-col gap-3 text-gray-600">
          <p className='uppercase text-2xl font-semibold text-purple-700'>Details</p>
          <p>531162 Visakhapatnam <br />Andhra Prdesh, India.</p>
          <p>Mobile: +91 939 020 516 <br />dammukiran4@gmail.com</p>
          <h2 className='text-xl font-semibold pt-3 text-blue-600'>Careers at <span className='text-purple-700'>Ice Creams</span></h2>
          <p>Learn more about our teams and job openings.</p>
          <h4 className='py-4 rounded cursor-pointer bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 text-white flex items-center justify-center w-60'>Explore Jobs</h4>
        </div>
      </div>
    <div>
      <div className='flex items-end font-semibold uppercase flex-col mx-auto w-2xl pt-12'>
              <Title text1={'Our Top Famous & More'} text2={'Popular Celebrity Dishes'}/>      
        </div>
    </div>
    <div className='grid grid-cols-2'>
       
      {menu_list.map((i,index)=>{
        return (
        <div key={index}>
          <div className='flex shadow-2xl rounded-2xl p-8 mx-16 my-2 text-gray-600 '>
            <img src={i.menu_image} alt="" className='w-32 mr-5 rounded'/>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingrediients and culianry expertise. Our mission is to satisfy your dining experience at a time.</p>
          </div>
        </div>
      )})}
      <div>

      </div>
    </div>

    <div className='flex w-full px-40 py-16 gap-20 text-blue-700'>
      <div className=' flex flex-col basis-1/2 p-5 rounded-xl bg-white shadow-2xl'>
          <div className='flex flex-col items-center '>
            <h3 className=' font-semibold text-2xl text-purple-700'>Contact Ice Creams</h3>
            <span className='text-blue-500'>We would love to hear from you!</span>
          </div>
          <div>
            <p className='text-purple-700 pt-2'>Name</p>
            <input type="text" placeholder='Your Name' className='w-full p-2 border-gray-400 border rounded outline-none' />
          </div>
          <div>
          <p className='text-purple-700 pt-2'>Email</p>
          <input type="text" placeholder='Your Email' className='w-full p-2 border-gray-400 border rounded outline-none' />

          </div>
          <div className='text-purple-700 pt-2'>
            <p>Message</p>
            <textarea  className='w-full p-2 border-gray-400 border rounded outline-none'></textarea>
          </div>
          <div>
            <button className='my-4 font-semibold py-3 px-6 rounded-lg w-full bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 text-white  cursor-pointer'>Send Message</button>
          </div>
      </div>
      <div  className=' flex flex-col basis-1/2 p-5  rounded-xl bg-white shadow-2xl'>
          <div>
            <h3 className='text-purple-700 font-semibold text-2xl '>Contact Information</h3>
          </div>
          <div className='flex p-2' ><FaPhone className=' w-5 h-5 text-blue-700 rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Phone</span>
            <p className='text-gray-600'>12345679</p>
            <p className='text-gray-600'>(555) 765-4321 (Customer Service)</p>

            </div>
          </div>
          <div className='flex p-2'><FaFacebookMessenger className=' w-5 h-5 text-blue-700 rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Email</span>
            <p className='text-gray-600'>dammukiran4@gmail.com</p>
            <p className='text-gray-600'>info@icecreams.com</p>
            </div>
          </div>
          <div className='flex p-2'><FaMap className=' w-5 h-5 text-blue-700 rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Address</span>
            <p className='text-gray-600'>123 Fresh Avenue Produce City, PC 12345</p>

            </div>
          </div>
          <div className='flex p-2'><FaClock className=' w-5 h-5 text-blue-700 rounded m-3 '/>
            <div>
            <span className='text-lg font-semibold'>Store Hours</span>
            <p className='text-gray-600'>Monday - Friday: 7:00 AM - 9:00 PM</p>
            <p className='text-gray-600'>Saturday: 8:00 AM - 8:00 PM</p>
            <p className='text-gray-600'>Sunday: 9:00 AM - 6:00 PM</p>

            </div>
          </div>
          
      </div>
    </div>

    </div>
  )
}

export default About
