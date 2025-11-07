import { Organization } from "../models/organization.model.js";

export const createTenant = (data) => Organization.create(data);
export const findOrganizationByEmail = (email) => {
  return Organization.findOne({ email });
};
export const findOrganizationDetails = (organization) => {
  return Organization.findOne({ _id: organization });
};
