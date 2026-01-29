import jwt from "jsonwebtoken";
import type { Request,Response } from "express";
import { JWT_SECRET } from "../tsconfig.js";


export const issignedin = async (req:Request,res:Response,next:any)=>{
    try {
        //take token as input from cookie
        //verify token with secret key
        //pass decoded one to req.user
        //next()
        let token = req.cookies?.token

        if(!token){
            console.log("no token");
            return res.status(401).json({
                success:false,
                message:"Authentication failed"
            })
            
        }
    
    const decoded = jwt.verify(token,JWT_SECRET)
    //@ts-ignore
    req.teacherId = decoded.id
    
    
    

    next();
    } catch (error) {
        console.log("Auth middleware failure");
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        next();
        
        
    }
    
    
    
};