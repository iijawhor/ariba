import { User } from "../models/user.model.js";
import { searchQuery } from "../utils/search.js";
export const signup = (data) => User.create(data);
export const createUser = (data) => User.create(data);
export const findUserByEmail = (email) => User.findOne({ email });

export const findUserById = (userId) => {
  return User.findById(userId);
};
export const searchUsers = (queryData) => {
  const { query, limit, page } = queryData;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const safeQuery = escapeRegex(query);

  return searchQuery(
    User,
    safeQuery,
    ["firstName", "lastName", "email", "phoneNumber"],
    limit,
    page
  );
};
