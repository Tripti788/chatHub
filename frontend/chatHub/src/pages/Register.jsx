import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    username:"",email:"",password:"",confirmPassword:""
  });

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch('https://chathub-mfeq.onrender.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.username,
        email: form.email,
        password: form.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! You can now log in.");
      navigate('/login');
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("An error occurred during registration.");
  }
};

  
  return (
    <div>
       <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%',backgroundColor:'#f1f5f9'}}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Name</label>
            <input type="text" className="form-control" id="username" name="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email"  required value={form.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" required value={form.password} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"  required value={form.confirmPassword} onChange={handleChange} />
          </div>
          <button type="submit" className="btn bg-dark w-100 " style={{color:'white'}}>Register</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register