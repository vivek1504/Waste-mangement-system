import React, { useRef, useState } from 'react';

const FileUploadComponent = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileInputClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      try {
        const response = await uploadFile(selectedFile);
        if (response.ok) {
          const data = await response.json();
          setUploadStatus(`File uploaded successfully! File location: ${data.location}`);
        } else {
          setUploadStatus('File upload failed.');
        }
      } catch (error) {
        console.error(error);
        setUploadStatus('File upload failed.');
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="sm:max-w-lg w-50  bg-white rounded-xl z-10">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-40 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  {/* <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img className="has-mask h-20 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="Upload" />
                  </div> */}
                  <div className='mt-20'>
                  <p className="pointer-none text-gray-500"><span className="text-sm">Drag and drop</span> files here <br /> or <a href="#" onClick={handleFileInputClick} className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>
          {selectedFile && (
            <div className="mt-2">
              <h3 className="text-lg font-medium text-gray-900">File Details:</h3>
              <ul className="mt-1 text-sm text-gray-600">
                <li><strong>Name:</strong> {selectedFile.name}</li>
                <li><strong>Size:</strong> {selectedFile.size} bytes</li>
                <li><strong>Type:</strong> {selectedFile.type}</li>
              </ul>
            </div>
          )}
          <div>
            <button type="submit" className="my-5 h-14 w-full flex justify-center items-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide
                font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
              Upload
            </button>
          </div>
        </form>
        {uploadStatus && (
          <div className="mt-4 text-center text-gray-600">
            {uploadStatus}
          </div>
        )}
      </div>
      <style>
        {`
          .has-mask {
            position: absolute;
            clip: rect(10px, 150px, 130px, 10px);
          }
        `}
      </style>
    </div>
  );
};

export default FileUploadComponent;