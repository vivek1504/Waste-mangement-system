import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/authMiddleware';

const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM"

export const officerRouter = express.Router();
const prisma = new PrismaClient();

const officerSignupSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string()
})

const officerLoginSchema = z.object({
    username : z.string(),
    password : z.string()
})

officerRouter.post("/signup",async(req,res)=>{
    const {username,email,password} = req.body;

    const { success } = officerSignupSchema.safeParse({username,email,password});

    if(!success){
        return res.json({message : "invalid inputs"})
    }

    try{
        const existingUser = await prisma.officer.findUnique({
            where : {
                username
            }
        })

        const existingEmail = await prisma.officer.findUnique({
            where : {
                email
            }
        })

        if(existingUser || existingEmail){
            return res.json({message : "cleaner already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const officer = await prisma.officer.create({
            data : {
                username,
                password : hashedPassword,
                email,
            }
        })

        const token =  sign({username,role : "officer"},JWT_SECRET);

        return res.json({message : "user created successfully",token,user:officer})

    }catch(error){
        console.log(error);
        return res.json({message : "cannot create user"})
    }

})

officerRouter.post("/login",async(req,res)=>{
    const {username,password} = req.body;

    const { success } = officerLoginSchema.safeParse({username,password});

    if(!success){
        return res.json({message : "invalid inputs"})
    }

    try{
        const officer = await prisma.officer.findUnique({
            where : {
                username
            }
        })

        if(!officer){
            return res.json({message : "officer does not exist"})
        }

        const passwordMatch = await bcrypt.compare(password,officer.password);

        if(!passwordMatch){
            return res.json({message : "invalid password"})
        }

        const token = sign({username,role : "officer"},JWT_SECRET);

        return res.json({message : "login successful",token,user:officer})

    }catch(error){
        console.log(error);
        return res.json({message : "cannot login"})
    }
})

officerRouter.get("/complaints",authMiddleware,async(req,res)=>{
    const role = req.body.user.role;
    if(role !== "officer"){
        return res.json({message : "unauthorized"})
    }
    try{
        const complaints = await prisma.complaint.findMany();

        return res.json({complaints})
    }catch(error){
        console.log(error);
        return res.json({message : "cannot fetch complaints"})
    }
})

officerRouter.get("/users",authMiddleware,async(req,res)=>{
    const role = req.body.user.role;
    if(role !== "officer"){
        return res.json({message : "unauthorized"})
    }
    try{
        const users = await prisma.user.findMany();

        return res.json({users})
    }catch(error){
        console.log(error);
        return res.json({message : "cannot fetch users"})
    }
})

officerRouter.get("/cleaners",authMiddleware,async(req,res)=>{
    const role = req.body.user.role;
    if(role !== "officer"){
        return res.json({message : "unauthorized"})
    }
    try{
        const cleaners = await prisma.cleaner.findMany();

        return res.json({cleaners})
    }catch(error){
        console.log(error);
        return res.json({message : "cannot fetch cleaners"})
    }
})