import React from 'react';
import {motion} from 'framer-motion'

function Navbar() {
  return (
    <>
        <header className="shadow-lg z-50 top-0 ">
            <nav className="bg-white border-gray-200 px-4  lg:px-6 py-2.5 h-28">
                    <motion.div className=" flex flex-wrap"
                        initial={{y:-100}}
                        animate={{y: -10}}
                        transition={{delay:0.2 , type: 'spring' , stiffness:120}}
                    >
                        <img
                        initial={{y:-100}}
                        animate={{y: 0}}
                        transition={{delay:0.2 , type: 'spring' , stiffness:120}}
                            src="https://us.123rf.com/450wm/bestforbest/bestforbest2001/bestforbest200100015/138351730-waste-management-recycling-and-garbage-sorting-icon-ecologic-vector-concept-multic-colored.jpg"
                            className="mr-3 h-24 rounded-full"
                            alt="Logo"
                        />
                        <span className='p-8  text-4xl font-bold'>Waste Management System</span>
                    </motion.div>
            </nav>
        </header>
    </>
  )
}

export default Navbar