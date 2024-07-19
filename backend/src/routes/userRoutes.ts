import { PrismaClient } from "@prisma/client";
import { Router }  from "express"
import bcrypt from "bcryptjs"
import { string, z } from "zod";
import {sign} from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware";

const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM"

export const userHandler = Router();
const prisma = new PrismaClient();

const userSignupSchema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string()
})

const userSigninSchema = z.object({
    username : z.string(),
    password : z.string()
})

userHandler.post("/signup",async(req,res)=>{
    const { username, password, email } = req.body;
    const result = userSignupSchema.safeParse({username,password,email})
    
    if (!result.success) {
      return res.status(400).json({ message: 'Missing username or password' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,

        },
      });

      const token = sign({username, role:"user"}, JWT_SECRET);

      res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
})

userHandler.post("/login",async(req,res)=>{
    const { username, password } = req.body;

  const result = userSigninSchema.safeParse({username,password})
  if (!result.success) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token =sign({username, role : "user"}, JWT_SECRET)
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  } 

})

userHandler.post("/raise-complaint", authMiddleware, async (req, res) => {
  const {role}= req.body.user;
  if (role !== 'user') {
      return res.status(403).json({ message: "unauthorized access" });
  }

  const {username} = req.body.user;
  const { flat, area, pincode, city, state } = req.body.address;
  const { beforeImage } = req.body;
  const pincodeInt = parseInt(pincode);

  try {
      const userDetails = await prisma.user.findUnique({
          where: {
              username: username,
          },
      });

      if (!userDetails) {
          return res.status(404).json({ message: "user does not exist" });
      }

      const address = await prisma.address.create({
          data: {
              flat: flat,
              area: area,
              pincode: pincodeInt,
              city: city,
              state: state,
          },
      });

      const newComplaint = await prisma.complaint.create({
          data: {
              address: {
                  connect: { id: address.id },
              },
              beforeImage: beforeImage,
              raisedBy: {
                  connect: { id: userDetails.id },
              },
              status: "Raised",
              createdOn: new Date(),
          },
      });

      return res.status(201).json({
          message: "Complaint raised successfully",
          complaint: newComplaint,
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

userHandler.get("/myComplaints",authMiddleware,async(req,res)=>{
    const {username} = req.body.user;
    const {role} = req.body.user;

    if(role !== "user"){
      return res.json({message : "unauthorized access"})
    }

    try {
      const userDetails = await prisma.user.findUnique({
        where : {
          username
        }
      })

      if(!userDetails){
        return res.json({message : "user not found"})
      }

      const myComplaints = await prisma.complaint.findMany({
        where : {
          raiserId : userDetails.id,
        },
        include : {
          address : true
        }
      })

      return res.json({myComplaints})
    }
    catch(error){
      console.log(error);
      return res.json({message : "cannot get complaints"})
    }
})