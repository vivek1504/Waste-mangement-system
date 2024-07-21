import { useEffect, useState } from "react";
import CardCheckingCleaner from "../components/cards/CardCheckingCleaner";
import CardAssign from "../components/cards/CardAssign";
import CardDone from "../components/cards/CardDone";
import { useRecoilState } from "recoil";
import { activeComplaintAtom } from "../atom";
import {motion} from 'framer-motion'

export const CleanerPage = () => {
    const [activeTab, setActiveTab] = useState('');
    const [activeComplaints, setActiveComplaints] = useRecoilState(activeComplaintAtom);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [assignedComplaints, setAssignedComplaints] = useState([]);
    console.log(activeComplaints);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    useEffect(()=>{
        const fetchComplaints = async () => {
              try {
                const response = await fetch('http://localhost:3000/cleaner/my-complaints', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setAssignedComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    },[])

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true); 
      setError(null); 

      try {
        const response = await fetch('http://localhost:3000/cleaner/all-complaints', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setActiveComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
        setError(error.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchComplaints();
  }, []);
    

    return <>
     <div className='flex flex-col items-center h-screen mt-10'>
            <div className='mb-5'>
                <motion.button
                    initial={{opacity:0,x:500}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.5,type: 'spring' , stiffness:120}}
                    whileHover={{
                    scale:1.1,
                    textShadow: "0px 0px 8px rgb(255 255 255)",
                    }} 
                    className={` py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab1' ? 'text-orange-400' : 'text-black'}`}
                    onClick={() => handleTabChange("tab1")} 
                >
                    <div className='border-2 bg-white border-black px-8 py-16 shadow-lg font-bold text-2xl rounded-xl'>
                        Pending Complaints
                    </div>

                </motion.button>
                <motion.button
                    initial={{opacity:0,x:500}}
                    animate={{opacity:1,x:0}}
                    transition={{duration:0.5,type: 'spring' , stiffness:120}}
                    whileHover={{
                    scale:1.1,
                    textShadow: "0px 0px 8px rgb(255 255 255)",
                    }}
                    className={`bg-transparent border-none py-2 px-4 mx-1 cursor-pointer text-lg ${activeTab === 'tab2' ? 'text-orange-400' : 'text-black'}`}
                    onClick={() => handleTabChange("tab2")} 
                >
                    <div className='border-2 bg-white border-black px-20 py-16 shadow-lg font-bold text-2xl rounded-xl'>
                        Completed
                    </div>
                </motion.button>
            </div>
            <div> 
             {activeTab !== "" &&
             <motion.div className='flex items-center justify-center w-full'
                  initial={{x:500}}
                  animate={{x:0}}
                  transition={{ type: 'spring' , stiffness:120}}>
                <div className='w-[1000px] h-[550px] bg-white border border-gray-300 rounded-lg p-5 shadow-lg  overflow-y-auto'>
                    {activeTab === 'tab1' && (
                        <div>
                          {assignedComplaints && assignedComplaints.filter(complaint =>{complaint.status === "Processing" }).map((complaint) => {
                            return <CardCheckingCleaner key={complaint.id} image={complaint.beforeImage} address={complaint.address} />
                          })}
                            
                        </div>
                    )}
                    {activeTab === 'tab2' && (
                        <div>
                          {assignedComplaints && assignedComplaints.filter(complaint =>{complaint.status === "Completed"}).map((complaint) => {
                            return <CardDone key={complaint.id} image={complaint.beforeImage} address={complaint.address} type={"completed"} />
                          })}
                        </div>                    
                    )}
                </div>
            </motion.div>}
            </div>
        </div>

        <div className="mt-10">
            {activeComplaints && activeComplaints.map((complaint) => {
                return <CardAssign key={complaint.id} id={complaint.id} image={complaint.beforeImage} address={complaint.address} />
            })}
        </div>
        
    </>
}