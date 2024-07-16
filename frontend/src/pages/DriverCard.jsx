import React from 'react'

function DriverCard() {
  return (
    <>
       <div className='flex items-center justify-center'>
       <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-164265,resizemode-75,msid-50132962/news/politics-and-nation/here-are-five-ways-to-tackle-bengalurus-garbage-problem.jpg" alt="Technology" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Location</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <img src="" alt="" />
        </p>
        <a 
          href="#" 
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Assign Complaint
          
        </a>
      </div>
    </div>
       </div>
    </>
  )
}

export default DriverCard