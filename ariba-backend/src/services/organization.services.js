import { Organization } from "../models/organization.model.js";
import * as OrganizationRepositories from "../repositories/organization.repositories.js";
import ApiError from "../utils/ApiError.js";
export const createTenant = async (data) => {
  const { name, phoneNumber, email, address, domain, subscriptionPlan } = data;

  if ([name, phoneNumber, email, address].some((fields) => !fields)) {
    throw new ApiError("All fields are required!", 400);
  }
  // check the existing teanant
  const existingTenant = await Organization.findOne({ email });
  if (existingTenant) {
    throw new ApiError("Organization with this email already exist!", 400);
  }

  const newTenant = await OrganizationRepositories.createTenant({
    name,
    phoneNumber,
    email,
    address
  });
  return newTenant;
};
