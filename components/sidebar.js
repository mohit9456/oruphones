import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaBars, FaChevronRight, FaTimes } from "react-icons/fa";

const SideBar = () => {

    const router = useRouter();

    const handleSubmit = () => {
        localStorage.removeItem("myuser");
        router.push("/login");
    }

    const handleClick = () => {
        sidebar1.classList.remove("hidden")
    }

    const handleCross = () => {
        console.log("jiii");
        sidebar1.classList.add("hidden")
    }


    return (
        <>
        <FaBars onClick={() => {handleClick()}} className='absolute top-5 left-3' />
        <div id='sidebar1' className='fixed top-0 left-0 h-[100vh] w-[30vh] shadow-md side-1 md:block hidden bg-white'>
            <FaTimes onClick={handleCross} className='absolute left-64 top-4 md:hidden' />
            <div className='flex flex-col items-center'>
                <span className='mt-8 mb-14 text-xl font-semibold border-2 py-2 px-10 rounded-lg shadow-sm outline-black'>Dashboard</span>
                
                <Link href={"/"} className='flex justify-center items-center mb-3 text-lg font-semibold border-2 py-2 px-12 rounded-lg shadow-sm text-blue-400 outline-blue-400'> <FaChevronRight className='mr-3' /> My Profile</Link>
                <Link href={"/connections"} className='flex justify-center items-center text-lg font-semibold border-2 py-2 px-6 rounded-lg shadow-sm text-blue-400 outline-blue-400'><FaChevronRight className='mr-3' /> My Connections</Link>
                <button onClick={handleSubmit} className='absolute bottom-10 text-md font-semibold border-2 py-1 px-6 rounded-lg shadow-sm text-black outline-blue-400'>Log Out</button>
            </div>     

        </div>
        </>
    )
}

export default SideBar
