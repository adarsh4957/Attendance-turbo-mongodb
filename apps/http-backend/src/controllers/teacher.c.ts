import bcrypt from "bcryptjs";
import { Teacher } from "../models/teacher.m.js";
import type { Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../tsconfig.js";


const signup=async (req:Request,res:Response)=>{
    
    const {name,email,password}=req.body;
    console.log(name,email,password);
    
    try {
        
        const existingTeacher= await Teacher.findOne({email});
        if(existingTeacher){
            return res.status(403).json(
                {
                    message:"Teacher already registered",
                }
            )
        }
        
        
        await Teacher.create({
            name:name,
            email:email,
            password:password
        });

        
        res.json({
            message:"Teacher is succesfully registered"
        })
        
    }
    
    catch (error) {
        res.status(411).json({
            message:"Teacher not Registered"
        })
        
    }
}

const signin = async (req:Request,res:Response)=>{

    const {email,password}=req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try {
        const teacher= await Teacher.findOne({email})
        if(!email){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        //@ts-ignore
    const ismatch= await bcrypt.compare(password,teacher.password)
    if(!ismatch){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    
    
    const token = jwt.sign({id:teacher?._id,email:teacher?.email},
        JWT_SECRET,{
            expiresIn : '24h'
        }
    )
    const cookieoption={
        httpOnly:true,
        secure:true,
        maxAge:24*60*60*1000
    }
    res.cookie("token",token,cookieoption)

    res.status(200).json({
        success:true,
        message:"Login Succesfull",
        token,
        user:{
            name:teacher?.name,
            email:teacher?.email,
        }
    });



} 
    
    
    catch (error) {
        res.status(400).json({
            message: "Invalid email or password",
            successs: false
        })
    }

}

const profile= async (req:Request,res:Response)=>{
    try {
        //@ts-expect-error
        const teacher=await Teacher.findOne(req.teacher.email).select("-password")
        console.log(teacher);
        
        if(!teacher){
            return res.status(400).json({
                success:false,
                message:"Teacher not found"
            })
        }
        res.status(200).json({
            success:true,
            teacher
        })
    } catch (error) {
        
    }
}


export {signup,signin,profile}