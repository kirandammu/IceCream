import React from 'react'
import Item from './Item'
import { useContext } from 'react'
import { store } from '../context/Context'
import Title from './Title'

const FoodList = ({category}) => {
  const {food_list, foodList} = useContext(store)
  return (
    <div>
        <Title text1={'Our Top Famous & More '} text2={'Popular Celebrity Dishes'}/>
      <div className='w-xl md:w-6xl md:grid md:grid-cols-4 md:gap-5 md:p-4 justify-center'>
        {foodList?.map((item)=>{
            if( category==='All' || category===item.category)
            {return(
                <div key={item._id} className='border-gray-500'>
                    <Item id={item._id} name={item.name} image={item.image} category={item.category} description={item.description} price={item.price}/>
                </div>
            )}
        })}
      </div>

    </div>
  )
}

export default FoodList
