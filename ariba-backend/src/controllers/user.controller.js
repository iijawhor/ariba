import * as UserService from "../services/user.services.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../services/user.services.js";
import jwt from "jsonwebtoken";
export const signupUser = async (req, res) => {
  try {
    const newUser = await UserService.signup(req.body);
    if (!newUser) {
      return res.status(400).json({ message: "User could not be created." });
    }

    return res
      .status(200)
      .json({ message: "User is created successfully", newUser });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
// controllers/authController.js
export const signinUser = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await UserService.signin(
      req.body
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "login failed. Please check your credentials." });
    }

    // Fix: Set secure to false for localhost development
    const options = {
      httpOnly: true,
      secure: false
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        user
      });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
export const logoutUser = async (req, res, next) => {
  try {
    await UserService.logoutUser(req.User._id);

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out" });
  } catch (error) {
    return res.status(400).json({ messgae: "Failed to loggedout" });
  }
};
export const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    if (!newUser) {
      return res.status(400).json({ message: "User is not created!" });
    }
    return res
      .status(200)
      .json({ message: "User is created successfully", user: newUser });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const result = await UserService.searchUser(req.query);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.status(200).json({
      success: true,
      message: `Found ${result.length} matching users.`,
      data: result
    });
  } catch (error) {
    console.log("Error in search...", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
// fetch the current user
export const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    user: req.user
  });
};
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request"
      });
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is expired or used"
      });
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
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid refresh token"
    });
  }
};
