import * as UserRepositories from "../repositories/user.repositories.js";
import ApiError from "../utils/ApiError.js";
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
