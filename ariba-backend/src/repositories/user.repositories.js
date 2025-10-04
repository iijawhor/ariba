import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { searchQuery } from "../utils/search.js";
import ApiError from "../utils/ApiError.js";
export const signup = (data) => User.create(data);
export const createUser = (data) => User.create(data);
export const findUserByEmail = (email) => User.findOne({ email });

export const findUserByIdWithoutSensitive = async (id) => {
  return await User.findById(id).select("-refreshToken -password");
};
export const findUserById = (userId) => {
  return User.findById(userId).populate({
    path: "organization",
    select: "name email status phoneNumber"
  });
};

export const searchUsers = (queryData) => {
  const { query, limit, page } = queryData;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const safeQuery = escapeRegex(query);

  return searchQuery(User, safeQuery, limit, page);
};
export const findUserDetailsById = async (userId) => {
  return await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "organizations",
        localField: "organization",
        foreignField: "_id",
        as: "organizationDetails"
      }
    },
    { $unwind: "$organizationDetails" },
    {
      $project: { password: 0, _v: 0, "organizationDetails._v": 0 }
    }
  ]);
};

export const findOrganizationUsers = async (organizationId, userRole) => {
  return await User.find({
    organization: new mongoose.Types.ObjectId(organizationId),
    userRole
  }).select("-password -__v -timeline -religion -education -dateOfjoining");
};
export const addTimeline = async (_id, title, event, eventDate) => {
  console.log("REPOS......", _id, title, event, eventDate);

  return await User.findByIdAndUpdate(
    _id,
    { $push: { timeline: [{ title, eventDate, event }] } },
    { new: true }
  );
};
export const updateUser = async (_id, updatedValue) => {
  return await User.findByIdAndUpdate(_id, updatedValue, {
    new: true,
    runValidators: true
  });
};
