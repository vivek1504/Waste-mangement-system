import React from 'react'
import { useState } from 'react'
import AssignComplaint from '../components/assignComplaint/AssignComplaint'
import Tab from '../components/userTab/tab/Tab'
import Checking from '../components/checking/Checking'


const UserPage = () => {
  const [showModal, setShowModal]=useState(false)
    return(
      <></>
      // <>
      //   <div className='h-screen flex flex-col items-center gap-6 bg-[#14161b] text-white'>
      //     <h1 className="text-5xl font-bold mt-4">Popup Modal</h1>
      //     <button onClick={()=>setShowModal(true)} className='bg-violet-500 px-4 py-2 rounded-lg text-lg'>Get the book</button>
      //     {showModal && <AssignComplaint onClose={() =>setShowModal(false)} />}
      //     {/* {showModal && <Checking onClose={() =>setShowModal(false)} />} */}
      //   </div>
      // </>
      // <><Tab/></>
  )
}

export default UserPage