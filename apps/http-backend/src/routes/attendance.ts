import express, { Router } from "express";
import { issignedin } from "../middlewares/auth.teacher";
import { markattendance } from "../controllers/attendance.c";


const attendancerouter:Router=express.Router()

attendancerouter.post("/mark",issignedin,markattendance)




export default attendancerouter;