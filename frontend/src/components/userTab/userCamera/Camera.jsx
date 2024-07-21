import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import FileUploadComponent from './UploadImg';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { imageAtom, stepAtom } from '../../../atom';
import {motion} from 'framer-motion'

const Camera = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const setImage = useSetRecoilState(imageAtom);

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
        setImage(data.url);
        setUploadStatus(`File uploaded successfully! File location: ${data.location}`);
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
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:1}}>
      <div className='flex justify-center items-center pt-4'>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="40%"
          height="40%"
          className='rounded-lg '
        />
        <div>
        {imgSrc && (
          <div className='ml-10 h-full w-full'>
            <img className='rounded-lg ' src={imgSrc} alt="Captured" />
          </div>
        )}
        </div>
      </div>

      <div className='flex items-center justify-center mt-4 gap-3' >
      <div className='flex items-center justify-center pt-2'>
        <motion.button className='border-2 rounded-lg dark:bg-black dark:text-white h-12 w-40'
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:0.2}}
          whileHover={{
          scale:1.1,
          textShadow: "0px 0px 8px rgb(255 255 255)",
          boxShadow:"0px 0px 8px rgb(255 255 255)" }}
        onClick={capture}>Capture photo</motion.button>
      </div>

      {imgSrc && (
        <div className='flex items-center justify-center pt-2'>
          <motion.button className='border-2 rounded-lg dark:bg-black dark:text-white h-12 w-40'
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.2}}
            whileHover={{
            scale:1.1,
            textShadow: "0px 0px 8px rgb(255 255 255)",
            boxShadow:"0px 0px 8px rgb(255 255 255)" }}
            onClick={uploadImage}>Upload photo</motion.button>
        </div>
      )}
      </div>

      {uploadStatus && (
        <div className='text-center pt-2'>
          <p>{uploadStatus}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Camera;
