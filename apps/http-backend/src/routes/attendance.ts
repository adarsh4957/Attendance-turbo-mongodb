import express, { Router } from "express";
import { issignedin } from "../middlewares/auth.teacher";
import { markattendance } from "../controllers/attendance.c";
import upload from "../middlewares/multer";


const attendancerouter:Router=express.Router()

attendancerouter.post("/mark",issignedin,upload.single("file"),markattendance)




export default attendancerouter;