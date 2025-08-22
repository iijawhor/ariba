import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const organizaionShcema = new Schema(
  {
    organizationId: {
      type: String,
      default: () => uuidv4(), // auto-generate unique id
      unique: true,
      immutable: true // can't be changed later
    },
    name: {
      type: String,
      required: true
    },
    domain: {
      type: String, // e.g. "greenfield.highschool.com"
      unique: true
    },
    contactNumber: {
      type: String,
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Phone number must be 10 digits"
      }
    },
    email: {
      type: Number,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      email: {
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Invalid Email Address"]
      }
    },
    superAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // link to the school admin user
    },
    subscriptionPlan: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free"
    }
  },
  { timestamps: true }
);

export const Organization = model("Organization", organizaionShcema);
