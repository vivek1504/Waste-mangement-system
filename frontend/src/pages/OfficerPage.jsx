import React, { useState } from 'react';
import { motion } from 'framer-motion';

function OfficerPage() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='flex flex-col items-center h-screen mt-10'>
      <div className='mb-5'>
        <motion.button
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          whileHover={{
            scale: 1.1,
            textShadow: '0px 0px 8px rgb(255 255 255)',
          }}
          className={`py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab1' ? 'text-blue-600' : 'text-black'}`}
          onClick={() => handleTabChange('tab1')}
        >
          <div className='border-2 bg-white w-[300px] border-black px-8 py-16 shadow-lg font-bold text-2xl rounded-xl'>
            Users
          </div>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          whileHover={{
            scale: 1.1,
            textShadow: '0px 0px 8px rgb(255 255 255)',
          }}
          className={`bg-transparent border-none py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab2' ? 'text-blue-600' : 'text-black'}`}
          onClick={() => handleTabChange('tab2')}
        >
          <div className='border-2 bg-white w-[300px] border-black px-20 py-16 shadow-lg font-bold text-2xl rounded-xl'>
            Cleaners
          </div>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          whileHover={{
            scale: 1.1,
            textShadow: '0px 0px 8px rgb(255 255 255)',
          }}
          className={`bg-transparent border-none  py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab3' ? 'text-blue-600' : 'text-black'}`}
          onClick={() => handleTabChange('tab3')}
        >
          <div className='border-2 bg-white w-[300px] border-black px-20 py-16 shadow-lg font-bold text-2xl rounded-xl'>
            Complaints
          </div>
        </motion.button>
      </div>
    </div>
  );
}

export default OfficerPage;
