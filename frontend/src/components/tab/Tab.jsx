import React from 'react'
import {useState} from "react";
import './Tab.css'
import UserAddress from '../userAddress/UserAddress';


const Tab = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange=(tab) =>{
        setActiveTab(tab)
    }
  return (
    <div className='tab-container'>
        <div className='tabs'>
            <button className={activeTab==='tab1' ? 'active-tab' : ''}
            onClick={()=> handleTabChange("tab1")} >
                Query
            </button>
            <button className={activeTab==='tab2' ? 'active-tab' : ''}
            onClick={()=> handleTabChange("tab2")} >
                Completed
            </button>
        </div>
        <div className='card-container '>
            <div className='card'>
                {activeTab === 'tab1' && (
                    <div>
                        <UserAddress/>
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