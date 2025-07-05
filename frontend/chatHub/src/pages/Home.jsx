import React from 'react';
import bg_image from '../assets/bg_image.png';
// import bg_image2 from '../assets/bg_image2.jpg';
import './Home.css'; // optional if you want custom styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-wrapper">
        <img src={bg_image} alt="Background Illustration" />
      </div>
      <div className="submit-btn">
       <button>Start talking...</button>      </div>
    </div>
  );
};

export default Home;