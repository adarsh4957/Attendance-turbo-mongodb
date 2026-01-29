import { Schema, model, Types } from "mongoose";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

const studentSchema = new Schema(
  {
    stu_name: { 
        type: String,
        required: true 
    },
    reg_no: {
        type: String,
        required: true,
        unique: true
         },
    rollno: {
        type: String,
        required: true 
        },
    faceembedding:{
        type:[Number],
        required:true,
        select:false
    },

    dob: { type: Date },

    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },

    guardian_name: { type: String, required: true },
    guardian_contact: { type: String, required: true },

    class: {
      type: Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },

    attendance: [{ type: Types.ObjectId, ref: "Attendance" }],
  },
  { timestamps: true }
);

export const Student = model("Student", studentSchema);
