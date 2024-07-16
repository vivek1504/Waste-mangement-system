import React, {useRef} from 'react'
import './Checking.css'
import { CiCircleRemove } from "react-icons/ci";
import { IoSwapHorizontal } from "react-icons/io5";
import { BsPatchCheck } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

const Checking = ({onClose}) => {
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
            <button onClick={onClose} className='place-serif-end '><CiCircleRemove size={30}/></button>
              <div class="card-container rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card">
                  <div class='upper-card gap-5 mt-10'>
                    <img src="https://api.time.com/wp-content/uploads/2021/03/trash-pandemic-covid-19-01.jpg"/>
                    <IoSwapHorizontal size={20}/>
                    <img src="https://st3.depositphotos.com/1000151/17469/i/950/depositphotos_174690294-stock-photo-cleaning-street-in-singapore.jpg" />
                  </div>
                  <div class="card-content">
                    <h3>Address</h3>
                    <p>4001 Dwivedi Orchard, Yakima, Himachal Pradesh 785 138, India</p>
                  </div>
                  <div class='icon gap-36'>
                  <BsPatchCheck size={40}/>
                  <RxCrossCircled size={40}/>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Checking