import React from 'react';
import bg_image from '../assets/bg_image.jpg';
// import bg_image2 from '../assets/bg_image2.jpg';
import './Home.css'; // optional if you want custom styling
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const handleChat= () => {
        navigate('/register');
}

  return (
    <div className="home-container">
      <div className="image-wrapper">
        <img src={bg_image} alt="Background Illustration" />
      </div>
      <div className="submit-btn">
       <button onClick={handleChat}>Start talking...</button> 
      </div>
    </div>
  );
};

export default Home;