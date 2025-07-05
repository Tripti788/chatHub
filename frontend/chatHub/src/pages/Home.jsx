import React from 'react'
import bg_image from '../assets/bg_image';
import large_set_of_flat_messages from '../assets/large_set_of_flat_messages.jpg';
const Home = () => {
  return (
    <div className='d-flex'>
        <div>
            <img src={bg_image} alt="" />

        </div>
        <div>
            <img src={large_set_of_flat_messages} alt="" />
        </div>
      
    </div>
  )
}

export default Home
