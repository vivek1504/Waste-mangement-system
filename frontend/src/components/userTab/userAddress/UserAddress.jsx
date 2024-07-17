import React from 'react'
import './UserAddress.css'
import { MdOutlineMyLocation } from "react-icons/md";

const UserAddress = () => {
  return (
    <div >
    <div className='header'>
        <p className="text ">Location</p>
    </div>
    <div className='mt-20 ml-4 mr-4 bg-white'>
    <div className='flex items-center justify-center bg-white'>
    <div className=" p-4 rounded-lg">
        <div className="relative bg-inherit">
            <input type="text" id="username" name="username" className="bg-white peer bg-transparent h-10 w-80 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/><label for="username" className=" bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Building , Company , Apartment , Lane</label>
        </div>
    </div>
    <div className=" p-4 rounded-lg">
        <div class="relative bg-inherit">
            <input type="text" id="username" name="username" className="bg-white peer bg-transparent h-10 w-80 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/><label for="username" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Area , Locality , Village</label>
        </div>
    </div>
    </div>
    <div className='flex items-center justify-center'>
    <div className=" p-4 rounded-lg">
        <div className="relative bg-inherit">
            <input type="text" id="username" name="username" className="bg-white peer bg-transparent h-10 w-52 rounded-lg text-black  placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/><label for="username" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Pincode</label>
        </div>
    </div>
    <div className=" p-4 rounded-lg">
        <div className="relative bg-inherit">
            <input type="text" id="username" name="username" className="bg-white peer bg-transparent h-10 w-52 rounded-lg text-black  placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/><label for="username" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">City</label>
        </div>
    </div>
    <div className=" p-4 rounded-lg">
        <div className="relative bg-inherit">
            <input type="text" id="username" name="username" className="bg-white peer bg-transparent h-10 w-52 rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600" placeholder="Type inside me"/><label for="username" className="bg-white absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">State</label>
        </div>
    </div>
    </div>
    </div>
    <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8  border-0 dark:bg-gray-700"/>
        <span className="absolute px-3 text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-black text-xl font-semibold">OR</span>
    </div>
    <div className="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
    <a
        className="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px "
        href="">
        <div className='locate inline-flex items-center justify-center '>
            <MdOutlineMyLocation className="text-xl text-white" />
            <p className='text-xl'>Use Current Location</p>
        </div>
    </a>
    </div>
    </div>

  )
}

export default UserAddress