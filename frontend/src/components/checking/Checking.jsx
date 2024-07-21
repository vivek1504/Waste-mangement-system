import React, {useRef} from 'react'
import './Checking.css'
import { CiCircleRemove } from "react-icons/ci";
import { IoSwapHorizontal } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import {motion} from 'framer-motion'

const Checking = ({onClose}) => {
    const modalRef = useRef();
  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }
  return (
      <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.2, duration:0.5}} ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='mt-10 flex flex-col gap-5 text-black'>
            <motion.button onClick={onClose} className='place-serif-end '
              animate={{y: 60,x:60}}><CiCircleRemove size={40}/></motion.button>
              <div class="card-container rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card">
                  <div class='upper-card gap-5 mt-10'>
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
                  <div class="card-content">
                    <h3>Address</h3>
                    <p>4001 Dwivedi Orchard, Yakima, Himachal Pradesh 785 138, India</p>
                  </div>
                  <div class='icon gap-36'>
                  <motion.div
                  transition={{duration:0.2}}
                          whileHover={{
                          scale:1.3
                          }}>
                  <BsPatchCheck size={50}/>
                  </motion.div>
                  <motion.div
                  transition={{duration:0.2}}
                          whileHover={{
                          scale:1.3
                          }}>
                  <RxCrossCircled size={50}/>
                  </motion.div>
                  </div>
                </div>
              </div>
          </div>
        
    </motion.div>
  )
}

export default Checking