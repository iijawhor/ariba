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
export const signinUser = async (req, res) => {
  try {
    const user = await UserService.signin(req.body);
    if (!user) {
      return res
        .status(401)
        .json({ message: "login failed. Please check your credentials." });
    }

    const { accessToken, refreshToken } = await UserService.signin(req.body);
    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        ...user
      });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
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
