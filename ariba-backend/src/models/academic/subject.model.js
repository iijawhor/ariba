import mongoose, { model, Schema } from "mongoose";
const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
      enum: [
        "Bengali",
        "English",
        "Mathematics",
        "Physical Science",
        "Life Science",
        "Social Science",
        "Computer Science",
        "Nutrition",
        "Geography",
        "History",
        "Philosophy",
        "Physical Education",
        "Arabic",
        "Islamic Studies",
        "Political Science",
        "Modern Computer Application",
        "Economics",
        "Sociology",
        "Work Education",
        "Accountancy",
        "Business Organisation and Management",
        "Islamic History",
        "Psychology",
        "Arts"
      ]
    },
    subjectCode: {
      type: String,
      required: false
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    }
  },
  { timestamps: true }
);
export const Subject = model("Subject", subjectSchema);
