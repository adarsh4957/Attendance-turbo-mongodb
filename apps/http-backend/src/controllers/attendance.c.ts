import { Attendance } from "../models/attendance.m.js";
import type { Request,Response } from "express";
import { Class } from "../models/class.m.js";
import { Student } from "../models/student.m.js";
import  FormData from "form-data";
import axios, { head } from "axios";
import euclideandist from "../euclidean.js";


const markattendance=async (req:Request,res:Response)=>{
    const {class_name,date}=req.body;
    //@ts-ignore
    const teacher_id=req.teacherId
    try {
        
        const class_exist=await Class.findOne({class_name:class_name})
        if(!class_exist){
            return res.status(403).json({
                message:"Class Do not exists",
                success:false
            })
        }
        const class_id=class_exist._id;
        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded",
                success:false
            })
        }
        const students=await Student.find({class:class_id}).select("faceembedding")
        
        const  form= new FormData();
        form.append("file",req.file.buffer,
            {
                filename:req.file.originalname,
                contentType:req.file.mimetype
            }
        )

        const response=await axios.post(
            "http://127.0.0.1:8000/recognize",
            form,
            {
                headers:form.getHeaders(),
            }
        )
        
        const recognizedembeddings:number[][]=response.data.embeddings;

        const present=new Set<String>();
        const threshold=0.5;

        for (const detected of recognizedembeddings){
            let bestmatch:string | null =null;
            let bestdistance=Infinity;

            for (const student of students){
                const dist=euclideandist(detected,student.faceembedding);

                if(dist<bestdistance){
                bestdistance=dist;
                bestmatch=student._id.toString()
                }
            }


                if(bestdistance<threshold && bestmatch){
                    present.add(bestmatch)
                }
            }
        
        const attendancerecords=[];


        for (const student of students){

            const status=present.has(student._id.toString()) ? "present" :"absent";

            attendancerecords.push({
                student:student._id,
                class:class_id,
                date:new Date(date),
                status:status
            })


        }
        const attendance=await Attendance.insertMany(attendancerecords);
        // const attendance=await Attendance.create({
        //     student:student_exist._id,
        //     class:class_id,
        //     date:date,
        //     status:status
        // })
        
        if(!attendance){
            return res.status(403).json({
                message:"Error in Marking attendance",
                success:false
            })
        }
        
        res.json({
            message:"Attendance Marked",
            success:true,
            present_count:present.size,
            totalstudents:students.length
        })
    } catch (error) {
        res.status(404).json({
            message:"Mark attendance burst",
            success:false
        })
    }
}

const updateattendance=async (req:Request,res:Response)=>{
    const {status}=req.body;
    const attendance_id=req.params.id;
    console.log(attendance_id);
    
    try {
        const attendance= await Attendance.findOne({_id:attendance_id});
        if(!attendance){
            return res.status(403).json({
                message:"Check Student id",
                success:false
            })
        }
        await Attendance.updateOne({_id:attendance_id},{status:status})

        const updated_attendance= await Attendance.findOne({_id:attendance_id});
        
        res.json({
            message:"Attendance update successfully",
            success:true,
            Updated_attendance:updated_attendance
        })
        
    } catch (error) {
        res.status(403).json({
            message:"Check Student ID",
            success:false
        })
    }
}

const gettodayattendance=async (req:Request,res:Response)=>{
    const class_name=req.params.class_name;
    const date=req.params.date;
    console.log(class_name,date);
    
    try {
        const class_exist=await Class.findOne({Class_name:class_name})
        if(!class_exist){
            return res.status(403).json({
                message:"Class does not exist",
                success:false
            })
        }
        console.log(class_exist);
        
        const todayattendance=await Attendance.find({classId:class_exist._id,date:date})
        .populate("studentId","Student_name rollNumber")
        .select("date classId status date");
            
        if(!todayattendance){
            return res.status(403).json({
                message:"Check Date and Class Name",
                success:false
            })
        }
        res.json({
            Message:"Attendance Found",
            success:false,
            Class_name:class_name,
            Attendance:todayattendance
        })
        
    } catch (error) {
        return res.status(403).json({
            message:"Error in getting Attendance",
            success:false
        })
    }
    
}

const attendancehistory=async (req:Request,res:Response)=>{
    const reg_no=req.params.reg_no;
    console.log(reg_no);
    
    try {
        const student_exist=await Student.findOne({reg_no:reg_no})
        if(!student_exist){
            return res.status(403).json({
                Message:"Invalid Registration Number",
                success:false
            })
        }
        console.log(student_exist);
        
        const attendancehistory=await Attendance.find({studentId:student_exist._id}).select("studentId date status")
        console.log(attendancehistory);
        
        res.json({
            message:"Attendance History Found",
            success:true,
            Student_Name:student_exist.stu_name,
            Attendance_History:attendancehistory
        })
    } catch (error) {
        
    }
}

export {markattendance,updateattendance,gettodayattendance,attendancehistory}