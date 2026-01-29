import { Schema, model, Types } from "mongoose";

const classSchema = new Schema(
  {
    class_name: { type: String, required: true },

    teacher: {
      type: Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },

    students: [{ type: Types.ObjectId, ref: "Student" }],
    attendances: [{ type: Types.ObjectId, ref: "Attendance" }],
  },
  { timestamps: true }
);

export const Class = model("Class", classSchema);
