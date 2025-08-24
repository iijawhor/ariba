import { Organization } from "../models/organization.model.js";

export const createTenant = (data) => Organization.create(data);
export const findOrganizationByEmail = (email) => {
  return Organization.findOne({ email });
};
