import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    targetUser: {
      type: String,
      enum: ["all", "admin", "teacher", "student"],
      required: true,
      default: "all"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: false
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization", // assuming you have an Organization model
      required: true
    }
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
