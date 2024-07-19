import React, {useRef} from 'react'
import './AssignComplaint.css'
import { CiCircleRemove } from "react-icons/ci";
import { MdAssignmentAdd } from "react-icons/md";


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
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='mt-10 flex flex-col gap-5 text-black'>
            <button onClick={onClose} className='place-serif-end '><CiCircleRemove size={30}/></button>
              <div class="card-container1 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card1">
                  <img src={image}/>
                  <div class="card-content1">
                    <h3>Address</h3>
                    <p>{address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}</p>
                  </div>
                  <button onClick={handleAssign} class="px-3 py-1.5 flex gap-2 items-center rounded-xl outline outline-2 mt-5 ml-4"><MdAssignmentAdd/> Assign Complaint</button>
                </div>
              </div>
          </div>
        </div>
      </>
  )
}

export default AssignComplaint