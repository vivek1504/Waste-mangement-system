import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

export const CleanerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();
    fetch("http://localhost:3000/cleaner/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(res => res.json())
    .then(data => {
      if(data.token){
        localStorage.setItem('token', data.token);
        setLoading(false)
        navigate('/cleanerDashboard');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <motion.div className="flex flex-col items-center justify-center px-6 pt-4 mx-auto h-[80vh]"
    initial={{y:-100 ,opacity:0}}
    animate={{y: -10,opacity:1}}
    transition={{delay:0.2 , type: 'spring' , stiffness:120}} >
      <div className="w-[530px] bg-white rounded-lg border md:mt-0 xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            LogIn in to your cleaner account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900">Enter Your Name</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="text"
                id="Name"
                placeholder="Enter Your Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            
            <motion.div
            whileHover={{
              scale:1.04,
              textShadow: "0px 0px 8px rgb(255 255 255)",
              boxShadow:"0px 0px 8px rgb(255 255 255)" }}>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </motion.div>
            <div className="flex items-center justify-center">
              {setLoading ?<motion.button
                whileHover={{
                  scale:1.2,
                  textShadow: "0px 0px 8px rgb(255 255 255)",
                }}
                type="submit"
                className="text-white w-28 bg-blue-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </motion.button> : <motion.button
                disabled
                whileHover={{
                  scale:1.2,
                  textShadow: "0px 0px 8px rgb(255 255 255)",
                }}
                type="disabled"
                className="text-white w-28 anim bg-blue-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
      
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                
                
              </motion.button>}
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <a href="/cleanerSignin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
