import * as UserRepositories from "../repositories/user.repositories.js";
import * as OrganizationRepositories from "../repositories/organization.repositories.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";

const generateAccessAndRefreshToken = async (userId) => {
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
    return res.status(400).json({ message: "All fields are required!" });
  }
  //   check the user with email already exist or not
  const existingUser = await UserRepositories.findUserByEmail(email);
  console.log("............", existingUser);

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
  console.log("loggedInUser..", loggedInUser);

  return { user: loggedInUser, refreshToken, accessToken };
};

export const createUser = async (userData) => {
  const { firstName, lastName, email, password, userRole } = userData;
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
    organization: organization._id
  });
  return newUser;
};
