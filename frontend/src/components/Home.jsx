import React, {useState} from 'react'
import MenuList from './MenuList'
import FoodList from './FoodList'
import Hero from './Hero'

const Home = () => {
      const [category,setCategory] = useState('All')
  return (
    <div>
      <div className='px-16 pt-4 md:px-32'>
        <Hero/>
        <MenuList category={category} setCategory={setCategory}/>
        <FoodList category={category} setCategory={setCategory}/>
      </div>
    </div>
  )
}

export default Home
