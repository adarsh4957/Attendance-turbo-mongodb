import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { PORT } from "./tsconfig"
import teacherrouter from "./routes/teacher"
import db from "./db"



const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/v1/teacher/",teacherrouter)


db();


app.listen(PORT||4000)