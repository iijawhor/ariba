import * as UserService from "../services/user.services.js";
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
