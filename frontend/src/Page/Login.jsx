import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { login_api } from '../utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  useEffect(()=>{

    const token = localStorage.getItem('Token');
    if(token){
      navigate('/');
    }
  },[]);

const {state}=useLocation();

const navigate=useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    try{
         const response=await axios.post(login_api,formData);
         if(response.status===200){
           localStorage.setItem("Token",response.data.token);
           navigate("/createblog");
         }
    }
    catch(err){

    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{state?.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5A639C] text-white p-2 rounded hover:bg-[#7776B3]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
