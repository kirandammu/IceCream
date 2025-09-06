import React, { useContext, useState } from 'react'
import { assets, menu_list } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { store } from '../context/Context';


const Add = () => {
    const {url, fetchList} = useContext(store)
    const [image,setImage] = useState(false)
    const [data,setData] = useState({
        name:'',
        description:'',
        price:'',
        category:''
    })
        const [isSubmitting, setIsSubmitting] = useState(false)


    const ChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const SubmitHandler = async (event)=>{
        event.preventDefault();
        setIsSubmitting(true)

        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("image",image)
        formData.append('category',data.category)

        const response = await axios.post(`${url}/food/add`,formData);
        if (response.data.success) {
            setData({
                name:'',
                description:'',
                price:'',
                category:''})
            setImage(false)
            toast.success(response.data.message)
            setIsSubmitting(false)
            
        }
        await fetchList()
    }
 
  return (
    <div className="mx-4 my-2 px-5">
        <form onSubmit={SubmitHandler}>
            <div className='text-2xl font-medium mb-4'>
                    <p className='text-blue-600'>Add <span className='text-purple-700 border-b-2'>Product</span></p>
                </div>
            <div className="flex flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} className='w-32 my-3 cursor-pointer'/>
                </label>
                <input  onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />

            </div>
            <div className="py-3">
                <p>Product name</p>
                <input type="text" name='name' onChange={ChangeHandler} value={data.name} placeholder='Type here' className='w-80 border border-gray-400 rounded outline-none p-1 px-3 my-1'/>
            </div>
            <div className="py-3">
                <p>Product description</p>
                <textarea name="description" onChange={ChangeHandler} value={data.description} rows='4' placeholder='Write content here' className='w-80 border border-gray-400 rounded p-1 outline-none my-1'></textarea>
            </div>
            <div className="flex w-80 justify-between">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name="category" onChange={ChangeHandler} value={data.category} className='w-40 border border-gray-400 p-1 px-3 outline-none rounded'>
                        <option value="">Select Category</option>
                                    {menu_list.map((item, index) => (
                                      <option key={index} value={item.menu_name}>
                                        {item.menu_name}
                                      </option>
                                    ))}

                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input type="text" name="price" onChange={ChangeHandler} value={data.price} placeholder='₹ 0' className='w-32 border border-gray-400 p-1 px-3 outline-none rounded' />
                </div>
            </div>
            <button type="submit" className="px-12 mt-6 py-1.5 cursor-pointer bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 text-white font-medium rounded" disabled={isSubmitting}>
                {isSubmitting ? <AiOutlineLoading className='text-2xl font-bold py-0.5 animate-spin'/>: 'ADD'}</button>        </form>
    </div>
  )
}

export default Add
