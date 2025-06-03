import React from 'react'

function Navbar() {
  return (
    <>
   
     
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between  items-center px-4 py-4 h-14 ">
      <div className='logo font-bold text-white'>
        <span className='text-green-800'>&lt;</span>Password 
        <span className='text-green-800'>Manager/&gt;</span></div>
      
      <button className='text-white p-1 bg-green-600 my-5 rounded-full  flex gap-4 justify-between items-center ring-white ring-1'>     <img className='invert p-1 w-10' src="git.png"alt='github'/>
      <span className='font-bold px-2'>Github</span>
 </button>
 
      </div>
    </nav>

</>
)
}

export default Navbar
