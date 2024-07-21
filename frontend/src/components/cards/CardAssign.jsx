import React from 'react'
import './Cards.css'
import { useState } from 'react'
import AssignComplaint from '../assignComplaint/AssignComplaint'
import {motion} from 'framer-motion'

function CardAssign({address,image,id}) {
    const [showModal, setShowModal]=useState(false)
  return (
    <>
    <motion.div className=' pt-2 flex items-center justify-center'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.2,duration:1}}
      >
    <div onClick={()=>setShowModal(true)} className="template flex flex-col items-center pl-3  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-white ">
        <img className="object-cover p-6 w-64 rounded-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg" src={image} alt="Noteworthy technology acquisitions 2021" />
        <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">Address</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}</p>
        </div>
    </div>
    {showModal && <AssignComplaint onClose={() =>setShowModal(false)} image={image} address={address} id={id} />}
    </motion.div>
    </>
  )
}

export default CardAssign