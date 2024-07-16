import { PrismaClient } from "@prisma/client";
import { Router }  from "express"
import {z} from "zod"
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware";

const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM"

export const cleanerHandler = Router();
const prisma = new PrismaClient();

const cleanerSignupSchema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string()
})

const cleanerSigninSchema = z.object({
    username : z.string(),
    password : z.string()
})

cleanerHandler.post("/signup",async(req,res)=>{
    const {username, email,password} = req.body;

    const { success } = cleanerSignupSchema.safeParse({username,email,password});

    if(!success){
        return res.json({message : "invalid inputs"})
    }

    try{
        const existingUser = await prisma.cleaner.findUnique({
            where : {
                username
            }
        })

        const existingEmail = await prisma.cleaner.findUnique({
            where : {
                email
            }
        })

        if(existingUser || existingEmail){
            return res.json({message : "cleaner already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const cleaner = await prisma.cleaner.create({
            data : {
                username,
                password : hashedPassword,
                email
            }
        })

        const token =  sign({username,role : "cleaner"},JWT_SECRET);

        return res.json({message : "user created successfully",token,user:cleaner})

    }catch(error){
        console.log(error);
        return res.json({message : "cannot create user"})
    }
})

cleanerHandler.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const {success} = cleanerSigninSchema.safeParse({username,password})

    if(!success){
        return res.json({message : "invalid inputs"})
    }
  
    try {
      const cleaner = await prisma.cleaner.findUnique({ where: { username } });
  
      if (!cleaner) {
        return res.json({ message: "Invalid username or password" }); 
      }
  
      const passwordMatch = await bcrypt.compare(password, cleaner.password);
  
      if (!passwordMatch) {
        return res.json({ message: "Invalid username or password" }); 
      }
  
      const token = sign({username, role:"cleaner"}, JWT_SECRET);
  
      return res.json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      return res.json({ message: "Error logging in" });
    }
  });


  cleanerHandler.put("/assign-complaint",authMiddleware,async(req,res)=>{
        const {role} = req.body.user;
        if(role !== "cleaner"){
            return res.json({message: "unauthorized access"});
        }

        const {username} = req.body.user;
        const complaintId = req.body.complaintId;
 
        try{
            const cleanerDetails = await prisma.cleaner.findUnique({
                where : {
                    username
                }
            })

            if(!cleanerDetails){
                return res.json({message : "error while fetching details"})
            }

            const assign = await prisma.complaint.update({
                where : {
                    id : complaintId
                },
                data : {
                    cleanerId : cleanerDetails.id,
                    status : "Processing"
                }
            })
            return res.json({message : "complaint assigned successfully"})
        }
        catch(error){
            console.log(error)
            return res.json({message : "error while assinging complaint"})
        }
  })

  cleanerHandler.put("/finish-complaint",authMiddleware,async (req,res)=>{
        const {role} = req.body.user;

        if(role !== "cleaner"){
            return res.json({message : "unauthorized access"})
        }

        const image = req.body.image;
        const complaintId = req.body.complaintId;

        try {
            const resolved = await prisma.complaint.update({
                where : {
                    id : complaintId
                },
                data : {
                    afterImage : image,
                    status : 'underEvaluation'
                }
            })

            return res.json({message : "this complaint is placed under Evaluation"});
        }
        catch(error){
            console.log(error)
            return res.json({message : "failed to finish complaint "})
        }
  })

  cleanerHandler.get("/my-complaints",authMiddleware,async (req,res)=>{
        const {role} = req.body.user;
        
        if(role !== "cleaner"){
            return res.json({message : "unauthorized access"})
        }

        const {username} = req.body.user

        try{
            const userDetails = await prisma.cleaner.findUnique({
                where : {
                    username
                }
            })

            if(!userDetails){
                return res.json({message : "invalid user"});
            }

            const complaints = await prisma.complaint.findMany({
                where : {
                    cleanerId : userDetails.id
                }
            })

            return res.json(complaints);
        }
        catch(error){
            console.log(error)
            return res.json({message : "cannot get complaints"})
        }
  })