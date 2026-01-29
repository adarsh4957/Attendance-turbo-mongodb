import mongoose from "mongoose";
import { MONGO_URL } from "./tsconfig.js";


//export a func that connects to db
const db = () =>{    
    mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("Connected to mongodb");  
    })
    .catch((err)=>{
        console.log("Error connecting mongodb");
        
    })
}

export default db;