import { Prisma, PrismaClient } from "@prisma/client";
import { Router }  from "express"



export const adminHandler = Router();
const prisma = new PrismaClient()

adminHandler.get("/under-evaluation-complaints",async(req,res)=>{
    try{
        const complaints = await prisma.complaint.findMany({
            where : {
                status : "underEvaluation"
            },
            include : {
                address : true
            }
        })

        return res.json({complaints})
    }
    catch(error){
        console.log(error)
        return res.json({message : "cannot get complaints"})
    }
})

adminHandler.put("/evaluate",async (req,res)=>{
    const complaintId = req.body.complaintId;
    const status = req.body.status;

    try{
        await prisma.complaint.update({
            where : {
                id : complaintId
            },
            data : {
                status : status
            }
        })
        return res.json({message : "evaluation complete"})
    }
    catch(error){
        console.log(error);
        return res.json({message : "evaluation failed"})
    }
})