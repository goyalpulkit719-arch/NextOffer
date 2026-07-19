import { Link } from "react-router-dom"
import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();
  const { isLoggedIn, isLoading }= useSelector((state) => state.auth);

  const handleGetStarted = () => {
      if (isLoggedIn) {
          navigate("/dashboard");
      } else {
          navigate("/login");
      }
  };

    if (isLoading) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              Loading...
          </div>
      );
  }

  return (
    <div className='bg-slate-50'>
      
      <button
          onClick={handleGetStarted}
          className="..."
      >
          Get Started
      </button>
      
    </div>
  )
}

export default Landing
