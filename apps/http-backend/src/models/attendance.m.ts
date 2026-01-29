import { Schema, model, Types } from "mongoose";

export enum AttendanceStatus {
  present = "present",
  absent = "absent",
}

const attendanceSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    class: {
      type: Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      required: true,
    },
  },
  { timestamps: true }
);

export const Attendance = model("Attendance", attendanceSchema);
