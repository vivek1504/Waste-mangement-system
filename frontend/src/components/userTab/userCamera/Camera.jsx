import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import FileUploadComponent from './UploadImg';
import { FaArrowRightToBracket } from "react-icons/fa6";

const Camera = () => {
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
        <button className='border-2 rounded-lg dark:bg-black dark:text-white h-12 w-40' onClick={capture}>Capture photo</button>
      </div>

      {imgSrc && (
        <div className='flex items-center justify-center pt-2'>
          <button className='border-2 rounded-lg dark:bg-black dark:text-white h-12 w-40' onClick={uploadImage}>Upload photo</button>
        </div>
      )}
      </div>

      {/* <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
        <span className="absolute px-3 text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black text-xl font-semibold mt-4">OR</span>
      </div>

      <FileUploadComponent /> */}
      <div className="flex flex-col items-center justify-center gap-5 mt-10 md:flex-row">
        <a
          className="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px "
          href="">
          <div className='locate inline-flex items-center justify-center '>
            <FaArrowRightToBracket className="text-xl text-white" />
            <p className='text-xl'>Step-2</p>
          </div>
        </a>
        </div>
      {/* <div className='flex justify-end items-center mt-14 mr-8'>
        <FaArrowRightToBracket className='text-2xl'/>
        <p className='text-2xl'>Step-2</p>
      </div> */}

      {uploadStatus && (
        <div className='text-center pt-2'>
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default Camera;
