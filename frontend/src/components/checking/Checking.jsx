import React, {useRef} from 'react'
import './Checking.css'
import { CiCircleRemove } from "react-icons/ci";
import { IoSwapHorizontal } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import {motion} from 'framer-motion'

const Checking = ({onClose , id ,beforeImage, afterImage, address}) => {
    const modalRef = useRef();
  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }

  const handleSubmitApproved = async()=>{
     await fetch(`http://localhost:3000/admin/evaluate`,{
      method: 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        complaintId : id,
        status : "Completed"
      })}
      )
      onClose();
    }

  const handleSubmitRejectd = async()=>{
    await fetch(`http://localhost:3000/admin/evaluate`,{
     method: 'PUT',
     headers: {
      'Content-Type': 'application/json',
  },
     body : JSON.stringify({
       complaintId : id,
       status : "Rejected"
        })
    })
 onClose()
}

  return (
      <motion.div
          initial={{opacity:0,y:0}}
          animate={{opacity:1,y:-40}}
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
                          }} src={beforeImage}/>
                    <IoSwapHorizontal size={30}/>
                    <motion.img
                          transition={{duration:0.3}}
                          whileHover={{
                          scale:1.1
                          }} src={afterImage} />
                  </div>
                  <div class="card-content">
                    <h3>Address</h3>
                    <p>{address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}</p>
                  </div>
                  <div class='icon gap-36'>
                  <motion.button
                  transition={{duration:0.2}}
                          whileHover={{
                          scale:1.1
                          }}
                  onClick={handleSubmitApproved}>
                  <div className='bg-[#03C03C] font-bold text-lg text-white rounded-lg px-10 py-3 '>
                      Accept
                    </div>
                  </motion.button>
                  <motion.button
                  transition={{duration:0.2}}
                          whileHover={{
                          scale:1.1,
                          textShadow: "0px 0px 8px rgb(255 255 255)",
                                    boxShadow:"0px 0px 8px rgb(255 255 255)" 
                          }}
                  onClick={handleSubmitRejectd}>
                    <div className='bg-[#FF0800] font-bold text-lg text-white rounded-lg px-10 py-3 '>
                      Reject
                    </div>
                  </motion.button>
                  </div>
                </div>
              </div>
          </div>
        
    </motion.div>
  )
}

export default Checking