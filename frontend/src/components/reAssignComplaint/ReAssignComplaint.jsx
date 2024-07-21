import React, {useRef} from 'react'
import './ReAssignComplaint.css'
import { CiCircleRemove } from "react-icons/ci";
import { IoSwapHorizontal } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { motion } from 'framer-motion';

const ReAssignComplaint = ({onClose}) => {
    const modalRef = useRef();
  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }
  return (
    <div>
      <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='mt-10 flex flex-col gap-5 text-black'>
            <motion.button onClick={onClose} className='place-serif-end '
            animate={{y: 60,x:60}}><CiCircleRemove size={40}/></motion.button>
              <div class="card-container2 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card2">
                  <div class='upper-card2 gap-5 mt-10'>
                    <motion.img
                          transition={{duration:0.3}}
                          whileHover={{
                          scale:1.1
                          }} src="https://api.time.com/wp-content/uploads/2021/03/trash-pandemic-covid-19-01.jpg"/>
                    <IoSwapHorizontal size={30}/>
                    <motion.img
                          transition={{duration:0.3}}
                          whileHover={{
                          scale:1.1
                          }} src="https://st3.depositphotos.com/1000151/17469/i/950/depositphotos_174690294-stock-photo-cleaning-street-in-singapore.jpg" />
                  </div>
                  <div class="card-content2">
                    <h3>Reason</h3>
                    <p>Places is not same.</p>
                  </div>
                  <motion.button 
                    transition={{duration:0.2}}
                    whileHover={{
                    scale:1.3,
                    textShadow: "0px 0px 8px rgb(255 255 255)",
                    boxShadow:"0px 0px 8px rgb(255 255 255)"
                    }}
                    class="px-3 py-1.5 flex gap-2 items-center ml-80 rounded-xl outline outline-2 mt-5 "><MdAssignmentAdd/> Assign Again</motion.button>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default ReAssignComplaint
