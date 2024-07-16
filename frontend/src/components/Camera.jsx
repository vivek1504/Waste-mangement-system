import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import FileUploadComponent from './UploadImg';

const Camera = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  return (
    <div className='border-2'>
        <div className='flex items-center justify-center pt-10'>
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="25%"
            height="25%"
            className='rounded-lg'
        />
        {imgSrc && (
            <div className='pl-8'>         
            <img className='rounded-lg' src={imgSrc} alt="Captured" />
            </div>
        )}       
        </div>
            
            <div className='flex items-center justify-center pt-2'>
                <button  className='border-2 rounded-lg dark:bg-black dark:text-white h-12 w-40' onClick={capture}>Capture photo</button>
            </div>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                <span className="absolute px-3 text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black text-xl font-semibold">OR</span>
            </div>
            <FileUploadComponent />
    </div>
  );
};

export default Camera;
