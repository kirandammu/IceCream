import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='text-2xl first-letter:text-3xl font-medium'>
        <p className='text-blue-600'>{text1} <span className='text-purple-700 border-b-2'>{text2}</span></p>
      </div>
  )
}

export default Title
