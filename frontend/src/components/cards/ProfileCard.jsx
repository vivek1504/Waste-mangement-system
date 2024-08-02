import React from 'react'

function ProfileCard() {
  return (
    <>
       <div className=" px-24 w-[1000px] h-[550px]  mx-auto bg-white rounded-xl shadow-lg space-y-6 sm:py-8 sm:flex sm:items-center sm:space-y-0 sm:space-x-8">
      <img className="block mx-auto pb-52 pt-20  h-[500px] rounded-full sm:mx-0 sm:shrink-0" src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png" alt="Profile" />
      <div className="text-center space-y-4 pl-0 sm:text-left">
        
        <div className="flex flex-col pb-10 pl-0 sm:flex-row mt-8 sm:space-x-6 space-y-6 sm:space-y-4 text-gray-800">
          <div className=" text-xl font-sans space-y-3">
            <p>Name: Urine LundFold</p>  
            <p>Mobile No. : +91 8273646574</p>
            <p>Email: erin@example.com</p>
            <p>Gender: Female</p>
            <p>Age: 20</p>
            <p>Aadhar Card: XXXX-XXXX-XXXX</p>
            <p>Address: 1234 Elm Street, Springfield, IL</p>
         </div>

        </div>
      </div>
    </div>
    </>

  )
}

export default ProfileCard