import express, { Router } from "express";
import { createclass,getallclasses,getclass,deleteclass,updateclass } from "../controllers/class.c";
import { issignedin } from "../middlewares/auth.teacher";

const classrouter:Router=express.Router();


classrouter.post("/create",issignedin,createclass)
classrouter.get("/getall",issignedin,getallclasses)
classrouter.get("/get/:classname",issignedin,getclass)
classrouter.post("/update/:classname",issignedin,updateclass)
classrouter.get("/del/:classname",issignedin,deleteclass)



export default classrouter;

