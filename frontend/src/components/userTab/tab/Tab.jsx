import React from 'react'
import {useState} from "react";
import './Tab.css'
import UserAddress from '../userAddress/UserAddress';
import Camera from '../userCamera/Camera';

const Tab = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className='flex flex-col items-center h-screen mt-10'>
            <div className='mb-5'>
                <button 
                    className={`bg-transparent border-none py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab1' ? 'text-orange-400' : 'text-black'}`}
                    onClick={() => handleTabChange("tab1")} 
                >
                    <p className='mr-10'>AssignComplaint</p>
                </button>
                <button 
                    className={`bg-transparent border-none py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab2' ? 'text-orange-400' : 'text-black'}`}
                    onClick={() => handleTabChange("tab2")} 
                >
                    CompletedAssign
                </button>
            </div>
            <div className='flex items-center justify-center w-full'>
                <div className='w-[1000px] h-[550px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg'>
                    {activeTab === 'tab1' && (
                        <div>
                            <UserAddress />
                            {/* <Camera/> */}
                        </div>
                    )}
                    {activeTab === 'tab2' && (
                        <div>
                            <h2>bie</h2>
                            <p>bye</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tab
