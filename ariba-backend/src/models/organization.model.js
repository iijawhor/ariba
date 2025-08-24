import mongoose, { model, Schema } from "mongoose";

import validator from "validator";
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
    addres: { type: String },
    phoneNumber: {
      type: String,
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Phone number must be 10 digits"
      }
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address" + value);
        }
      }
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active"
    },
    subscriptionStartDate: { type: Date },
    subscriptionEndDate: { type: Date },
    subscriptionPlan: [
      {
        type: String,
        enum: ["free", "basic", "premium"],
        default: "free"
      }
    ]
  },
  { timestamps: true }
);

export const Organization = model("Organization", organizaionShcema);
