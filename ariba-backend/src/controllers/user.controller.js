import * as UserService from "../services/user.services.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../services/user.services.js";
import { getCookieOptions } from "../utils/getCoookieOptions.js";
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
      secure: false, // OK since you're on HTTP locally
      sameSite: "lax", // Accepts cookies in most cross-origin cases on localhost
      path: "/"
    };

    return res
      .cookie("accessToken", accessToken, getCookieOptions(req.headers.origin))
      .cookie(
        "refreshToken",
        refreshToken,
        getCookieOptions(req.headers.origin)
      )
      .status(200)
      .json({
        message: "User logged in successfully",
        user,
        accessToken, // include here
        refreshToken // include here
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
    await UserService.logoutUser(req.user._id);

    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .clearCookie("accessToken", getCookieOptions(req.headers.origin))
      .clearCookie("refreshToken", getCookieOptions(req.headers.origin))
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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
// fetch the current user
export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      user: req.user
    });
  } catch (error) {
    return res.status(400).json({ messgae: "Failed to get current user" });
  }
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
      .cookie("accessToken", accessToken, getCookieOptions(req.headers.origin))
      .cookie(
        "refreshToken",
        newRefreshToken,
        getCookieOptions(req.headers.origin)
      )
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
export const getUserDetailsById = async (req, res) => {
  const userId = req.params;
  try {
    const user = await UserService.getUserDetailsById(userId);
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};
export const getUsersByOrganization = async (req, res) => {
  const { organizationId, userRole } = req.query;

  try {
    const users = await UserService.getOrganizationUsers({
      organizationId,
      userRole
    });
    if (!users) {
      throw new ApiError("Users not found!", 400);
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      users: users
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};
export const addTimeline = async (req, res) => {
  const { title, event, eventDate } = req.body; // timeline object from frontend
  const { id } = req.params;

  try {
    const timeline = await UserService.addTimeline(id, title, event, eventDate); // use a different variable name
    return res.status(200).json({
      message: "Timeline added successfully",
      success: true,
      timeline: timeline.toJSON().timeline
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await UserService.updateUser(id, req.body);
    if (!updatedUser) {
      throw new ApiError("User is not updated!", 400);
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};
