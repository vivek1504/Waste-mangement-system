import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import UserAddress from '../userAddress/UserAddress';
import Camera from '../userCamera/Camera';
import { IoReloadCircleOutline } from "react-icons/io5";
import CardDone from '../../cards/CardDone';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addressAtom, complaintAtom, imageAtom } from '../../../atom';
import {motion} from 'framer-motion'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('');
    const [step, setStep] = useState(1);
    const address = useRecoilValue(addressAtom);
    const image = useRecoilValue(imageAtom);
    const [complaints, setComplaints] = useRecoilState(complaintAtom);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/user/myComplaints',{headers :{authorization:localStorage.getItem('token')}})
            .then(res => res.json())
            .then(data => setComplaints(data.myComplaints))
            .catch(error => console.error('Error fetching complaints:', error));
    }, [refresh]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }
    console.log(complaints)

    const handleSubmit = () => {
        fetch('http://localhost:3000/user/raise-complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                address: address,
                beforeImage: image,
            })
        })
        .then(() => setActiveTab(''))
        .catch(error => console.error('Error submitting complaint:', error));
    }
    

    return (
        <div className='flex flex-col items-center h-screen mt-10 mb-20'>
            <div className='mb-5 '>
                {['tab1', 'tab2'].map((tab, index) => (
                    <motion.button
                    initial={{opacity:0,x:500}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.5,type: 'spring' , stiffness:120}}
                    whileHover={{
                    scale:1.1,
                    textShadow: "0px 0px 8px rgb(255 255 255)",
                    }}
                        key={index}
                        className={`py-2 px-4 mx-1 cursor-pointer  text-lg ${activeTab === tab ? 'text-blue-600' : 'text-black'}`}
                        onClick={() => handleTabChange(tab)}
                    >
                        <div className={`border-2 bg-white border-black px-${tab === 'tab1' ? '10' : '20'} py-16 shadow-lg font-bold text-2xl rounded-xl w-80`}>
                            {tab === 'tab1' ? 'Raise a Complaint' : 'Completed'}
                        </div>
                    </motion.button>
                ))}
            </div>
            {activeTab !== '' && (
                <motion.div className='flex items-center justify-center w-full'
                        initial={{x:500}}
                        animate={{x:0}}
                        transition={{ type: 'spring' , stiffness:120}}>
                    <div className='w-[1000px] h-[550px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg overflow-y-auto'>
                        {activeTab === 'tab1' && step === 1 && (
                            <div>
                                <Camera />
                                <motion.button onClick={() => setStep(2)} className="flex flex-col items-center justify-center gap-5 mt-10 md:flex-row ml-96"
                                    initial={{opacity:0}}
                                    animate={{opacity:1}}
                                    transition={{duration:0.5}}
                                    whileHover={{
                                    scale:1.1,
                                    textShadow: "0px 0px 8px rgb(255 255 255)",
                                    boxShadow:"0px 0px 8px rgb(255 255 255)" }}
                                >
                                    <a className="inline-block bg-green-400 w-auto text-center min-w-[200px] px-6 py-4 text-white rounded-full shadow-xl sm:w-auto">
                                        <div className='locate inline-flex items-center font-bold justify-center '>
                                            <p className='text-xl'>Step-2</p>
                                        </div>
                                    </a>
                                </motion.button>
                            </div>
                        )}
                        {activeTab === 'tab1' && step === 2 && (
                            <div>
                                <UserAddress />
                                <div className='flex justify-center '>
                                    <motion.button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600  text-white text-lg font-bold px-10 py-3 rounded-full mt-10'
                                    initial={{opacity:0}}
                                    animate={{opacity:1}}
                                    transition={{duration:0.3}}
                                    whileHover={{
                                    scale:1.2,
                                    }}>
                                        Submit
                                    </motion.button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'tab2' && (
                            <div>
                                {complaints && complaints.filter((complaint)=>complaint.status === "Completed").map((complaint) => (
                                    <CardDone key={complaint.id} address={complaint.address} image={complaint.beforeImage} type="completed" />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        
        <div className="flex justify-around mt-24 border-dotted border-b-2 w-11/12 ">
            <div className="flex justify-around w-full space-x-72 mb-2 select-none rounded-t-lg rounded-full border-b-4 border-slate-600 bg-slate-500 p-4 font-medium hover:border-slate-700">
                <div className="font-bold text-2xl mt-2 text-white">My Complaints</div>
                    <button>
                        <IoReloadCircleOutline onClick={()=>{
                            setRefresh(!refresh)
                                }} color="white" size={50}/>
                    </button>          
                </div>              
            </div>
        

            <div className='mt-10 mb-20'>
            {complaints && complaints.filter((complaint)=>complaint.status === "Processing" || complaint.status === "Raised"|| complaint.status === "underEvaluation").map((complaint) => (
                <CardDone key={complaint.id} address={complaint.address} image={complaint.beforeImage} type="pending" />
            ))}
            </div>
            <div className="text-slate-200">
                hone laga
            </div>
        </div>
    )
}

export default Dashboard;