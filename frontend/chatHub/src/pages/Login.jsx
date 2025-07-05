import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form,setForm]= useState({email:"",password:""});
    const navigate = useNavigate();

    const handleChange =  (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });

    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://chathub-mfeq.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token); // Store JWT
      localStorage.setItem('user', JSON.stringify(data.user));
      alert("Login successful");
      navigate('/chat'); // Or wherever your chat screen is
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
};

   
  return (
     <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className='card p-4 shadow' style={{maxWidth: '400px', width: '100%',backgroundColor:'#f1f5f9'}}>
        <h2 className='text-center '>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3' id='email' >
                <label htmlFor="email" className='form-label'>Email Address</label>
                <input type="text" className='form-control' name='email'  placeholder='enter your email' onChange={handleChange}
                />
            </div>

            <div className='mb-3' id='password' >
                <label htmlFor="email" className='form-label'>Email Address</label>
                <input type="password" className='form-control' name='password'  placeholder='Password' onChange={handleChange}/>
            </div>

             <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 text-light bg-dark">Login</button>
        </form>
        <div className="text-center mt-3 text-dark">
          <small >Don't have an account? <a href="/register"  style={{color:'#444444'}}>Register</a></small>
        </div>
        
  </div>
</div>
      
   
  )
}

export default Login
