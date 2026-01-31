import express, { Router } from "express";
import { issignedin } from "../middlewares/auth.teacher";
import { markattendance,updateattendance,gettodayattendance,attendancehistory } from "../controllers/attendance.c";
import upload from "../middlewares/multer";


const attendancerouter:Router=express.Router()

attendancerouter.post("/mark",issignedin,upload.single("file"),markattendance)
attendancerouter.post("/update",issignedin,updateattendance)
attendancerouter.get("/get/:class_name/:date",issignedin,gettodayattendance)
attendancerouter.get("/history/reg_no",issignedin,attendancehistory)



export default attendancerouter;