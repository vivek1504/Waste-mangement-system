import React, {useRef} from 'react'
import './AssignComplaint.css'
import { CiCircleRemove } from "react-icons/ci";
import { MdAssignmentAdd } from "react-icons/md";


const AssignComplaint = ({onClose}) => {
  const modalRef = useRef();
  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }
    return(
      <>
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='mt-10 flex flex-col gap-5 text-black'>
            <button onClick={onClose} className='place-serif-end '><CiCircleRemove size={30}/></button>
              <div class="card-container rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card">
                  <img src="https://api.time.com/wp-content/uploads/2021/03/trash-pandemic-covid-19-01.jpg"/>
                  <div class="card-content">
                    <h3>Address</h3>
                    <p>4001 Dwivedi Orchard, Yakima, Himachal Pradesh 785 138, India</p>
                  </div>
                  <button class="px-3 py-1.5 flex gap-2 items-center rounded-xl outline outline-2 mt-10"><MdAssignmentAdd/> Assign Complaint</button>
                </div>
              </div>
          </div>
        </div>
      </>
  )
}

export default AssignComplaint
