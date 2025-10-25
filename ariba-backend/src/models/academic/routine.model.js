import mongoose from "mongoose";
const routineSchema = new mongoose.Schema(
  {
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true
    },
    subjectName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    teachers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      validate: [(arr) => arr.length > 0, "At least one teacher is required"]
    },
    day: {
      type: String,
      required: true,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    date: { type: Date, required: true },
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{2}:\d{2}$/.test(v),
        message: "startTime must be in HH:mm format"
      }
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },
    endTime: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{2}:\d{2}$/.test(v),
        message: "endTime must be in HH:mm format"
      }
    }
  },
  { timestamps: true }
);

// Optional: prevent duplicates per grade/subject/day/time
routineSchema.index(
  { grade: 1, subject: 1, day: 1, startTime: 1 },
  { unique: true }
);

const Routine = mongoose.model("Routine", routineSchema);
export default Routine;
