import * as OrganizationServices from "../services/organization.services.js";

export const createTenant = async (req, res) => {
  try {
    const newTenant = await OrganizationServices.createTenant(req.body);
    if (!newTenant) {
      return res.status(400).json({ message: "Organization is not created" });
    }

    return res.status(200).json({
      message: "Oragnization is created successfully",
      organization: newTenant
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
export const getTenant = async (req, res) => {
  try {
    const tenant = await OrganizationServices.findOrganizationDetails(req);

    return res
      .status(200)
      .json({ message: "Tenant fetched successfully", tenant });
  } catch (error) {
    return res.status(400).json({
      message: error?.response?.message || "Failed to get Tenant!"
    });
  }
};
