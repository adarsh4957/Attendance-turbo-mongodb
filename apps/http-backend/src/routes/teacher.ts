import express, { Router } from "express";
import { profile, signin, signup } from "../controllers/teacher.c";
import { issignedin } from "../middlewares/auth.teacher";


const teacherrouter:Router=express.Router()


teacherrouter.post("/signup",signup)
teacherrouter.post("/signin",signin)
teacherrouter.get("/profile",issignedin,profile)


export default teacherrouter;