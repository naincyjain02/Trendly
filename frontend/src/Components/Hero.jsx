import React from 'react'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='bg-[#9B86BD] h-screen flex justify-around'>
      <div className=' flex flex-col  mt-64 '>
        
        <div className='text-[90px] font-medium leading-10 font-serif'>Narratives</div>
        <div className='text-[90px] font-medium font-serif '> & Insights</div>
        <div className='text-[22px] w-fit'>Dive in to discover, write, and evolve</div>
        <NavLink className='px-8 py-4 w-fit rounded-full bg-[#7776B3] text-[20px] font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-8' to='/register' state={{title:"Join Trendly."}}>Start reading</NavLink>
        </div>
    
      <div className='mt-48 ml-24'>
        <img src={require("../images/bgblog.png")} alt="" />
      </div>
    </div>
  )
}

export default Hero
