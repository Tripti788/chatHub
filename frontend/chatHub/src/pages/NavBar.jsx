import React from 'react'
import logo from '../assets/favicon.jpeg';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (

       <nav className="navbar navbar-expand-lg navbar-dark px-3  shadow" style={{backgroundColor:"transparent"}}>
      <Link className="navbar-brand" to="/">
        ChatHub
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/chat">
              Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
                      Register
                  </Link>
          </li>
        </ul>
      </div>
    </nav>

  )
}

export default NavBar