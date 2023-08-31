import React from 'react'

const EditProfile = () => {
    return (
        <div className="text-sm flex justify-between items-center hidden">
            <input className='text-md font-semibold px-3 py-1 rounded-md shadow-md outline outline-slate-300' type="text" />
            <button className='bg-slate-300 text-sm px-5 py-1 rounded-2xl shadow-sm'>Save</button>
        </div>
    )
}

export default EditProfile
