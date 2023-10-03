import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
import Admin from './Admin';
import Home from './Home';
import UserDetails from './UserDetails';

const Nav = () => {

  // Functionality to Navigate back to Home Page
  const navigate = useNavigate();
  const backToHome = () => {
    navigate('/');
  }

  return (
    <div className="flex flex-col items-center justify-center text-center gap-16">
      {/*This is the nav bar of my app - currently only includes title of app. Font Awesome icon is used for logo. */}
      <nav className="flex items-center justify-start p-5 w-full">
        <div onClick={backToHome} className="flex items-center">
           <FontAwesomeIcon icon={faHandshakeAngle} size="3x" className="mr-2 text-gray-dark" />
           <span className="text-gray-dark text-2xl">Augusto's Help Desk</span>
        </div>
      </nav>
      {/*React Router DOM is used here to Route to three separate pages - Home, Admin, and User Details */}
      <div className = "flex flex-col items-center justify-center text-center w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:userId" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Nav;
