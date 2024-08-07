import React, {useRef , useState } from 'react'
import './PopUpCleanerSubmit.css'
import Webcam from 'react-webcam';
import { CiCircleRemove } from "react-icons/ci";
import {motion} from 'framer-motion'

export const PopUpCleanerSubmit = ({onClose, id, image, address}) => {
    const modalRef = useRef();
  const closeModal = (e) =>{
    if(modalRef.current === e.target){
      onClose();
    }
  }
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const uploadImage = async () => {
    if (!imgSrc) {
      alert('Please capture a photo first.');
      return;
    }

    const file = dataURLtoFile(imgSrc, 'captured_image.jpg');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const res = await fetch('http://localhost:3000/cleaner/finish-complaint', {
          method: 'PUT',
          headers : {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({
            complaintId: id,
            image: data.url
          })
        })
        setUploadStatus(`File uploaded successfully!`);
        onClose();
      } else {
        setUploadStatus('File upload failed.');
      }
    } catch (error) {
      setUploadStatus('File upload failed.');
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  return (
        <motion.div
            initial={{opacity:0,y:0}}
          animate={{opacity:1,y:-30}}
          transition={{delay:0.2, duration:0.5}} ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-[#f7f5ee] bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-4 flex flex-col gap-5 text-black'>
            <motion.button onClick={onClose} className='place-serif-end '
            animate={{y: 60,x:60}}><CiCircleRemove size={40}/></motion.button>
                <div class="card-container rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <div class="card">
                    <div class='upper-card gap-5 mt-4'>
                    <motion.img
                          transition={{duration:0.3}}
                          whileHover={{
                          scale:1.1
                          }} src={image}/>
                    <div class="card-content">
                        <h3>Address</h3>
                        <p>{address.flat + ", " + address.area + ", " + address.city + ", " + address.pincode + ", " + address.state}</p>
                    </div>
                  </div>
                <div>
      <div className='flex justify-center items-center pt-4'>
        
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="40%"
          height="40%"
          className='rounded-lg '
        />
        {imgSrc && (
          <div className='ml-10 h-full w-full'>
            <motion.img
                          transition={{duration:0.3}}
                          whileHover={{
                          scale:1.5
                          }} className='rounded-lg ' src={imgSrc} alt="Captured" />
          </div>
        )}
        
      </div>

      <div className='flex items-center justify-center mt-4 gap-3' >
      <div className='flex items-center justify-center pt-2'>
        <motion.button
        transition={{duration:0.2}}
        whileHover={{
          scale:1.1,
          textShadow: "0px 0px 8px rgb(255 255 255)",
                                    boxShadow:"0px 0px 8px rgb(255 255 255)"
        }}
        className='border-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white h-12 w-40 mr-10' onClick={capture}>Capture photo</motion.button>
      </div>

      {imgSrc && (
        <div className='flex items-center justify-center pt-2'>
          <motion.button 
          transition={{duration:0.2}}
          whileHover={{
          scale:1.1,
          textShadow: "0px 0px 8px rgb(255 255 255)",
          boxShadow:"0px 0px 8px rgb(255 255 255)"
        }}
          className='border-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white h-12 w-40' onClick={uploadImage}>Submit</motion.button>
        </div>
      )}
      </div>
      {uploadStatus && (
        <div className='text-center pt-2'>
          <p>{uploadStatus}</p>
        </div>
      )}
      </div>
                  </div>
              </div>
          </div>
        </motion.div>
  )
}
