import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import UserAddress from '../userAddress/UserAddress';
import Camera from '../userCamera/Camera';
import { FaArrowRightToBracket } from "react-icons/fa6";
import CardDone from '../../cards/CardDone';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addressAtom, complaintAtom, imageAtom } from '../../../atom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('');
    const [step, setStep] = useState(1);
    const address = useRecoilValue(addressAtom);
    const image = useRecoilValue(imageAtom);
    const [complaints, setComplaints] = useRecoilState(complaintAtom);

    useEffect(() => {
        fetch('http://localhost:3000/user/myComplaints',{headers :{authorization:localStorage.getItem('token')}})
            .then(res => res.json())
            .then(data => setComplaints(data.myComplaints))
            .catch(error => console.error('Error fetching complaints:', error));
    }, []);

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
        <div className='flex flex-col items-center h-screen mt-10'>
            <div className='mb-5'>
                {['tab1', 'tab2'].map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === tab ? 'text-orange-400' : 'text-black'}`}
                        onClick={() => handleTabChange(tab)}
                    >
                        <div className={`border-2 bg-white border-black px-${tab === 'tab1' ? '10' : '20'} py-16 shadow-lg font-bold text-2xl rounded-xl`}>
                            {tab === 'tab1' ? 'Raise a Complaint' : 'Completed'}
                        </div>
                    </button>
                ))}
            </div>
            {activeTab !== '' && (
                <div className='flex items-center justify-center w-full'>
                    <div className='w-[1000px] h-[550px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg overflow-y-auto'>
                        {activeTab === 'tab1' && step === 1 && (
                            <div>
                                <Camera />
                                <button onClick={() => setStep(2)} className="flex flex-col items-center justify-center gap-5 mt-10 md:flex-row">
                                    <a className="inline-block w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-translate-y-px">
                                        <div className='locate inline-flex items-center justify-center'>
                                            <FaArrowRightToBracket className="text-xl text-white" />
                                            <p className='text-xl'>Step-2</p>
                                        </div>
                                    </a>
                                </button>
                            </div>
                        )}
                        {activeTab === 'tab1' && step === 2 && (
                            <div>
                                <UserAddress />
                                <div className='flex justify-center'>
                                    <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10'>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'tab2' && (
                            <div>
                                {complaints.filter((complaint)=>complaint.status === "Completed").map((complaint) => (
                                    <CardDone key={complaint.id} address={complaint.address} image={complaint.beforeImage} type="completed" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {complaints.filter((complaint)=>complaint.status === "Processing" || "underEvaluation" || "Raised").map((complaint) => (
                <CardDone key={complaint.id} address={complaint.address} image={complaint.beforeImage} type="pending" />
            ))}
        </div>
    )
}

export default Dashboard;
