import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import App from '../App';

const Header = () => {

  const [token,setToken]=useState(false);

useEffect(()=>{
   setToken(localStorage.getItem('Token'));

   
   
},[]);

const handleLogOut=()=>{

  localStorage.removeItem('Token');
  setToken(false);
}


 

  return (
    <div className='flex justify-around items-center p-5 bg-[#5A639C] w-full fixed'>
         <div className='text-2xl font-extrabold font-serif'>Trendly</div>
         <div className='flex justify-center items-center text-md gap-[60px]'>
            <div>Our story</div>
            <NavLink className='cursor-pointer' to="/createblog" state={{title:"Create an account to start writing."}}>Write</NavLink>
            {
              !token? <div className='flex items-center gap-[60px]'>            <NavLink className='cursor-pointer' to="/login" state={{title:"Welcome back."}}>Sign in</NavLink>
            <NavLink className='px-6 py-3 rounded-full bg-[#7776B3]' to="/register" state={{title:"Join Trendly."}}>Get started</NavLink> </div> :
            <div className='flex items-center gap-[60px]'>
                          <NavLink className='cursor-pointer' to="/login" state={{title:"Welcome back."}}>My Blogs</NavLink>
                          <button onClick={handleLogOut} className='px-6 py-3 rounded-full bg-[#7776B3]'>Logout</button>
               </div>

            }

         </div>
    </div>
  )
}

export default Header
