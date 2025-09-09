import * as UserRepositories from "../repositories/user.repositories.js";
import * as OrganizationRepositories from "../repositories/organization.repositories.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await UserRepositories.findUserById(userId);

    if (!user) {
      throw new ApiError("User not found! in token", 404);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      "Something went wrong while generating access and refresh token",
      500
    );
  }
};
export const signin = async (userData) => {
  const { email, password } = userData;
  const user = await UserRepositories.findUserByEmail(email);
  if (!user) {
    throw new ApiError("User not found!", 404);
  }

  const passwordIsMatch = await bcrypt.compare(password, user.password);
  if (!passwordIsMatch) {
    throw new ApiError("Invalid credentials.", 401);
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await UserRepositories.findUserById(user._id).select(
    "-password -refreshToken"
  );

  return { user: loggedInUser, accessToken, refreshToken };
};
export const signup = async (userData) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    userRole = "superAdmin"
  } = userData;

  if (
    [email, firstName, lastName, phoneNumber, password, userRole].some(
      (fields) => !fields
    )
  ) {
    throw new ApiError("All fileds are required!", 400);
  }
  //   check the user with email already exist or not
  const existingUser = await UserRepositories.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError("User with this email already exist", 409);
  }

  const newUser = await UserRepositories.signup({
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    userRole
  });
  return newUser;
};

export const createUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userRole,
    about,
    gender,
    phoneNumber,
    timeline,
    department,
    address,
    dateOfBirth
  } = userData;
  if (
    [firstName, lastName, email, password, userRole].some((fields) => !fields)
  ) {
    throw new ApiError("All fileds are required", 400);
  }
  // check existing user
  const existingUser = await UserRepositories.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError("User with this email is already exist", 400);
  }
  const orgnizationEmail = "kasbagolahighmadrasha@gmail.com";
  const organization = await OrganizationRepositories.findOrganizationByEmail(
    orgnizationEmail
  );
  if (!organization) {
    throw new ApiError("Organization not found!", 400);
  }
  const newUser = await UserRepositories.createUser({
    firstName,
    lastName,
    email,
    password,
    userRole,
    about,
    gender,
    phoneNumber,
    timeline,
    department,
    dateOfBirth,
    address,
    organization: organization._id
  });
  return newUser;
};
export const logoutUser = async (userId) => {
  // remove refreshToken
  const user = await updateUserRefreshToken(userId, undefined);
  if (!user) {
    throw new Error("User not found");
  }

  return true;
};
export const searchUser = async (searchFields) => {
  const { query } = searchFields;
  if (!query) {
    throw new ApiError("Please enter query to search!", 400);
  }
  const searchResults = await UserRepositories.searchUsers(searchFields);
  return searchResults;
};
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError("Unauthorized request", 401);
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError("Invalid refresh token", 401);
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError("Refresh token is expired or used", 401);
    }

    const options = {
      httpOnly: true,
      secure: false
    };

    const { newRefreshToken, accessToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        accessToken,
        refreshToken: newRefreshToken
      });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to refresh access token"
    });
  }
};
export const getUserDetailsById = async (userId) => {
  if (!userId) {
    throw new ApiError("Please send a valid user Id", 400);
  }
  const user = await UserRepositories.findUserDetailsById(userId);

  if (!user || user.length === 0) {
    throw new ApiError("User not found", 404);
  }
  return user[0];
};
export const getOrganizationUsers = async ({ organizationId, userRole }) => {
  if (!organizationId) {
    throw new ApiError("Please send a valid organization id", 400);
  }

  const users = await UserRepositories.findOrganizationUsers(
    organizationId,
    userRole
  );

  if (!users || users.length === 0) {
    throw new ApiError("User not found", 404);
  }

  return users;
};
export const addTimeline = async (id, title, event, date) => {
  console.log("Timeline service ....", id, title, event, date);

  if (!id) throw new ApiError("Id undefined", 404);
  if (!title) throw new ApiError("Please enter timeline data", 400);

  const timline = await UserRepositories.addTimeline(id, title, event, date);
  if (!timline) throw new ApiError("Timeline creation failed!", 400);

  return timline;
};
export const updateUser = async (_id, updatedValue) => {
  const existingUser = await UserRepositories.findUserById(_id);
  if (!existingUser) {
    throw new ApiError("User is not found!", 400);
  }

  if (!updatedValue) {
    throw new ApiError("Enter some value to update", 400);
  }
  const allowedOptions = [
    "firstName",
    "lastName",
    "about",
    "dateOfBirth",
    "address",
    "phoneNumber",
    "gender",
    "religion"
  ];

  const invalidKeys = Object.keys(updatedValue).filter(
    (key) => !allowedOptions.includes(key)
  );

  if (invalidKeys.length > 0) {
    throw new ApiError(
      `These fields are not allowed: ${invalidKeys.join(", ")}`,
      400
    );
  }
  const updatedUser = await UserRepositories.updateUser(_id, updatedValue);
  return updatedUser;
};
