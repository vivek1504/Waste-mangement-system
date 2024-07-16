import React from 'react'
import Card from '../pages/Card'


function Navbar() {
  return (
    <>
        <header className="shadow-lg z-50 top-0">
            <nav className="bg-white border-gray-200 px-4  lg:px-6 py-2.5">
                    <div className=" flex flex-wrap">
                        <img
                            src="https://us.123rf.com/450wm/bestforbest/bestforbest2001/bestforbest200100015/138351730-waste-management-recycling-and-garbage-sorting-icon-ecologic-vector-concept-multic-colored.jpg"
                            className="mr-3 h-24 rounded-full"
                            alt="Logo"
                        />
                        <span className='p-8  text-4xl font-bold'>Waste Management System</span>
                    </div>
            </nav>
        </header>

       


    </>
  )
}

export default Navbar