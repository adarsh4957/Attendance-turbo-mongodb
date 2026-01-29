import express, { Router } from "express";
import { profile, signin, signup } from "../controllers/teacher.c";


const teacherrouter:Router=express.Router()


teacherrouter.post("/signup",signup)
teacherrouter.post("/signin",signin)
teacherrouter.post("/profile",profile)


export default teacherrouter;