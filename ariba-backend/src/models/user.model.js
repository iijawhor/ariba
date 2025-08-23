import mongoose, { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const timelineSchema = new Schema({
  title: { type: String, required: true },
  event: { type: String, required: true },
  eventDate: {
    type: Date,
    default: Date.now(),
    get: (val) => (val ? val.toLocaleString().split("T")[0] : null)
  }
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: [1, "First Name must be atleast 1 character"],
    maxlength: [20, "First Name cannot exceed 20 characrtars"],
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [1, "Last Name must be atleast 1 character"],
    maxlength: [20, "Last Name cannot exceed 20 characrtars"],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"]
  },
  password: {
    type: String,
    required: true,
    validate: [validator.isStrongPassword, "Enter a strong password"]
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: "Phone number must be 10 digits"
    }
  },
  organizaion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  },
  dateOfBirth: {
    type: Date,
    get: (val) => (val ? val.toLocaleString().split("T")[0] : null)
  },
  dateOfjoining: {
    type: Date,
    default: Date.now(),
    get: (val) => (val ? val.toLocaleString().split("T")[0] : null)
  },
  bloodGroup: {
    type: String
  },
  age: { type: Number },
  gender: { type: String, enum: ["male", "female", "others"] },
  religion: { type: String, default: "Not willing to share" },
  address: {
    type: String,
    minlength: 3,
    maxlength: 100
  },
  userRole: {
    type: String,
    enum: ["superAdmin", "admin", "teacher", "student"]
  },
  status: {
    type: String,
    enum: ["active", "inactive"]
  },
  department: { type: String, enum: ["science", "arts", "commerce"] },
  avatar: { type: String, default: "" },
  timeline: [timelineSchema]
});
userSchema.set("toJSON", { getters: true });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedpassword = await hash(this.password, 10);
  this.password = hashedpassword;
  next();
});

userSchema.methods.isPasswordCorrect = async function () {
  return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },

    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

export const User = model("User", userSchema);
