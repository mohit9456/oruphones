import React from 'react'

const Navbar = ({file, name}) => {

    return (
        <div className='flex bg-slate-100 h-[18vh] pb-20 pt-10 nav-1 w-[100vw]' >
            <div className='flex absolute right-48 top-9 px-14 rounded-md shadow-md py-2' >
            {!file ?<div style={{ "width": "8vh", "height": "8vh" }} className='bg-zinc-400 mr-6 rounded-lg shadow-sm'></div>
                 : <img style={{ "width": "8vh", "height": "8vh" }} className=' mr-6 rounded-lg shadow-sm' src={`${file}`} alt="" />}
                 <div className='flex flex-col '>
                    <span className='text-sm'>Welcome back !</span>
                    
                    <span className='md:text-3xl text-2xl font-semibold'>{name}</span>
                </div>

            </div>

        </div>
    )
}
export default Navbar
