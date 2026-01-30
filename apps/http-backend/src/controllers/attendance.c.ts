import { Attendance } from "../models/attendance.m.js";
import type { Request,Response } from "express";
import { Class } from "../models/class.m.js";
import { Student } from "../models/student.m.js";


const markattendance=async (req:Request,res:Response)=>{
    const {student_name,class_name,date,status}=req.body;
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
        
        const student_exist=await Student.findOne({stu_name:student_name,class:class_id})
        const attendancealreadymarked=await Attendance.findOne({date:date,studentId:student_exist?._id})
        if(attendancealreadymarked){
            return res.status(403).json({
                message:"Student is already marked"
            })
        }
        if(!student_exist){
            return res.status(403).json({
                message:"Student do not exist",
                success:false,
            })
        }
        
        const attendance=await Attendance.create({
            student:student_exist._id,
            class:class_id,
            date:date,
            status:status
        })
        
        if(!attendance){
            return res.status(403).json({
                message:"Error in Marking attendance",
                success:false
            })
        }
        
        res.json({
            message:"Attendance Marked",
            success:true,
            Attendance:attendance
        })
    } catch (error) {
        
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
            Student_Name:student_exist.Student_name,
            Attendance_History:attendancehistory
        })
    } catch (error) {
        
    }
}

export {markattendance,updateattendance,gettodayattendance,attendancehistory}