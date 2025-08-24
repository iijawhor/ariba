import { Organization } from "../models/organization.model.js";

export const createTenant = (data) => Organization.create(data);
