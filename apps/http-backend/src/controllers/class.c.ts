import { Class } from "../models/class.m";
import type { Request,Response } from "express";



const createclass= async(req:Request,res:Response)=>{
    

    const classname=req.body.classname;  
    console.log(classname);
    //@ts-ignore
    console.log(req.teacherId);
    
    try {
    const existclass=await Class.findOne({class_name:classname})
    
    if(existclass){
        return res.status(403).json({
            Message:"Class already exist"
        })
    }
        
console.log(existclass);

    const createdclass = await Class.create({
            class_name:classname,
            //@ts-ignore
            teacherId:req.teacherId,
        })
console.log(createdclass);

        res.json({
            message:"Class Created Succesfully",
            success:true,
            class:createdclass
        })
    } catch (error) {
        res.status(403).json({
            message:"Class Creation Unsuccesfull",
            success:false,
            error
        })
    }

}


const getallclasses=async (req:Request,res:Response)=>{
    try {
        //@ts-ignore
        const allclasses=await Class.find({teacherId:req.teacherId})

        res.json({
            success:true,
            classes:allclasses
        })
        
    } catch (error) {
        res.json({
            message:"Can not get Classes",
            success:false
        })
    }
}

const getclass=async(req:Request,res:Response)=>{
    const classname=req.params.classname;
    try {
        const specificclass = await Class.findOne({Class_name:classname});
        if (!specificclass){
            return res.status(403).json({
                message:"Recheck class name",
                success:false
            })
        }

        return res.json({
            Success:true,
            Class:specificclass
        })


    } catch (error) {
        
    }
}

const updateclass=async (req:Request,res:Response)=>{
    const {newclass}=req.body;
    const classname=req.params.classname;
    try {
        const updatedclass=await Class.updateOne({Class_name:classname},{Class_name:newclass});
        res.json({
            message:"Updated Class name Succesfull",
            success:true,
            Updatedclass:updateclass
        })
    } catch (error) {
        res.json({
            message:"Error in updating Class Name",
            success:false
        })
    }
}

const deleteclass=async (req:Request,res:Response)=>{
    const classname=req.params.classname;

    try {
        const classexist=await Class.findOne({Class_name:classname})
        if(!classexist){
            return res.status(403).json({
                message:"ReCheck class name",
                success:false
            })
        }
        await Class.deleteOne({Class_name:classname})
        res.json({
            message: "Class Succesfully deleted",
            success:true
        })
    } catch (error) {
        res.json({
            messge:"Erro in deleteing Class",
            success:false
        })
    }
}
export {createclass,getallclasses,getclass,updateclass,deleteclass};