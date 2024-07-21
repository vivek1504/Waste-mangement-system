import React from 'react'
import './Cards.css'
import { useState } from 'react'
import { PopUpCleanerSubmit } from './PopUpCleanerSubmit'

const CardCheckingCleaner = () => {
    const [showModal, setShowModal]=useState(false)
  return (
    <div className='pt-2 flex items-center justify-center'>
    <div onClick={()=>setShowModal(true)} className="template flex flex-col items-center pl-3  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-white ">
        <img className="object-cover p-6 w-64 rounded-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg" src="https://cdn.britannica.com/02/141102-050-82CB8A59/Bulldozers-landfill.jpg" alt="Noteworthy technology acquisitions 2021" />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Noteworthy technology acquisitions 2021</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <span className='flex justify-end h-11 w-11 '><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6nOI0usYypR7m6rWTeQuhZ39rtmiS5aTsDw&s" alt="" className='rounded-full' /></span>
        </div>
    </div>
    {showModal && <PopUpCleanerSubmit onClose={() =>setShowModal(false)} />}
    </div>
  )
}

export default CardCheckingCleaner