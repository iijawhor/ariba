import mongoose, { model, Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      required: true,
      default: "yet to login",
      enum: ["in", "out", "yet to login"]
    },
    loggedInAt: { type: Date, default: null },
    loggedOutAt: { type: Date, default: null },
    date: {
      type: Date,
      required: true,
      default: () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0); // normalize to midnight
        return d;
      }
    },
    ipAddress: { type: String, default: "" },
    device: { type: String, default: "" }
  },
  { timestamps: true }
);

// Ensure one record per user per day
attendanceSchema.index(
  { user: 1, date: 1, loggedInAt: 1, loggedOutAt: 1 },
  { unique: true }
);

export const Attendance = model("Attendance", attendanceSchema);
