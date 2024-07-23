import { useEffect, useState } from "react"
import CardCheckingAdmin from "../components/cards/CardCheckingAdmin"
import { IoReloadCircleOutline } from "react-icons/io5";

export const Admin = () => {
    const [refresh, setRefresh] = useState(false);
    const [complaints, setComplaints] = useState([]);
    useEffect(()=>{
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/under-evaluation-complaints');
                const data = await response.json();
                setComplaints(data.complaints);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };
        fetchComplaints();
    },[refresh])

    
    return <div>
        <div>
        <div className="flex justify-around mt-12 border-dotted border-b-2 w-full">
        <div className="flex justify-around w-full space-x-72 mb-2 select-none rounded-t-lg rounded-full border-b-4 border-slate-600 bg-slate-500 p-4 font-medium hover:border-slate-700">
          <div className="font-bold text-2xl mt-2 text-white">Under Evaluation Complaints</div>
          <button>
                <IoReloadCircleOutline onClick={()=>{
                  setRefresh(!refresh)
                }} color="white" size={50}/>
          </button>          
        </div>              
        </div>
            {complaints.length>0 && complaints.map((complaint) => {
                return <CardCheckingAdmin key={complaint.id} beforeImage={complaint.beforeImage} afterImage={complaint.afterImage} id={complaint.id} address={complaint.address} />
            })}
        </div>
       
    </div>
}