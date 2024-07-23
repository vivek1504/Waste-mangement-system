import React from 'react'
import './Cards.css'
import {motion} from 'framer-motion'

const CardDone = ({address,image,type}) => {
   const checkingLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6nOI0usYypR7m6rWTeQuhZ39rtmiS5aTsDw&s"
   const completedLogo = "https://static-00.iconduck.com/assets.00/process-completed-symbolic-icon-2048x2048-baquwdk1.png"
  return (
    <motion.div className='pt-2 flex items-center justify-center'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.2,duration:1}}>
    <div className="template flex flex-col items-center pl-3  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 ">
        <img className="object-cover p-6 w-64 rounded-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg" src={image} alt="Noteworthy technology acquisitions 2021" />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Address</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}</p>
            <span className='flex justify-end h-10 w-10'><img src={type=== "completed" ? completedLogo : checkingLogo} alt="" /></span>
        </div>
    </div>
    </motion.div>
  )
}

export default CardDone