import mongoose, { model, Schema } from "mongoose";

const gradeSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
      enum: ["V", "VI", "VII", "VIII", "IX", "X"]
    },
    sections: [
      {
        sectionName: {
          type: String,
          required: true,
          enum: ["A", "B", "C", "D"]
        },
        capacity: {
          type: Number,
          required: true,
          min: 1,
          default: 30
        }
      }
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject" // references available subjects for this class
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const Grade = model("Grade", gradeSchema);
