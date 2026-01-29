import { model,Schema } from "mongoose";
import { unique } from "next/dist/build/utils.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const Teacherschema= new Schema({
    name:{type: String},
    email:{type:String},
    password:{type:String},
},{
    timestamps:true
})

Teacherschema.pre("save",async function (this:any,next) {
    if (this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10)
    }

}
)


export const Teacher= model("Teacher",Teacherschema)