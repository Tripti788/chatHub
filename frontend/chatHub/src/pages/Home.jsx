import React from 'react';
import bg_image from '../assets/bg_image';
import large_set_of_flat_messages from '../assets/large_set_of_flat_messages.jpg';
import './Home.css'; // optional if you want custom styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-wrapper">
        <img src={bg_image} alt="Background Illustration" />
      </div>
      <div className="image-wrapper">
        <img src={large_set_of_flat_messages} alt="Messages Illustration" />
      </div>
    </div>
  );
};

export default Home;
