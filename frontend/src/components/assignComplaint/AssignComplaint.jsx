import React, {useRef} from 'react'
import './AssignComplaint.css'
import { CiCircleRemove } from "react-icons/ci";
import { MdAssignmentAdd } from "react-icons/md";
import {motion} from 'framer-motion'

const AssignComplaint = ({onClose, address, image, id}) => {
  const modalRef = useRef();
  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }

  const handleAssign = async() => {
      try{
        const res = await fetch(`http://localhost:3000/cleaner/assign-complaint`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({complaintId : id})
        });
        if(res.ok){
          onClose();
        }
      }catch(err){
        console.log(err);
      }
  }
    return(
      <>
        <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:0.2, duration:0.5}} ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='mt-10 flex flex-col gap-5 text-black'>
            <motion.button onClick={onClose} className='place-serif-end '
            animate={{y: 60,x:60}}><CiCircleRemove size={40}/></motion.button>
              <div class="card-container1 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card1">
                  <motion.img
                          transition={{duration:0.3}}
                          whileHover={{
                          scale:1.05
                          }}
                  src={image}/>
                  <div class="card-content1">
                    <h3>Address</h3>
                    <p>{address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}</p>
                  </div>
                  <motion.button 
                    transition={{duration:0.2}}
                    whileHover={{
                    scale:1.1,
                    textShadow: "0px 0px 8px rgb(255 255 255)",
                    boxShadow:"0px 0px 8px rgb(255 255 255)"
                    }} onClick={handleAssign} class="px-3 py-1.5 flex gap-2 items-center rounded-xl outline outline-2 mt-5 ml-4"><MdAssignmentAdd/> Assign Complaint</motion.button>
                </div>
              </div>
          </div>
        </motion.div>
      </>
  )
}

export default AssignComplaint