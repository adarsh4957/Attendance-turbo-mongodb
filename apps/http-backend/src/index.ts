import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { PORT } from "./tsconfig"
import teacherrouter from "./routes/teacher"
import classrouter from "./routes/class"
import db from "./db"
import studentrouter from "./routes/student"
import attendancerouter from "./routes/attendance"



const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/v1/teacher/",teacherrouter)
app.use("/api/v1/class/",classrouter)
app.use("/api/v1/student/",studentrouter)
app.use("/api/v1/attendance/",attendancerouter)

db();


app.listen(PORT||4000)