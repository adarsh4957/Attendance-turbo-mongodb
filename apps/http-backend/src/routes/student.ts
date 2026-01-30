import express, { Router } from "express";
import upload from "../middlewares/multer";
import { addstudent } from "../controllers/students.c";
import { issignedin } from "../middlewares/auth.teacher";

const studentrouter:Router=express.Router()


studentrouter.post("/add",issignedin,upload.single("file"),addstudent)



export default studentrouter;