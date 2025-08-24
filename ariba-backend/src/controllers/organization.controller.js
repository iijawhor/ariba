import * as OrganizationServices from "../services/organization.services.js";

export const createTenant = async (req, res) => {
  try {
    const newTenant = await OrganizationServices.createTenant(req.body);
    if (!newTenant) {
      return res.status(400).json({ message: "Organization is not created" });
    }

    console.log("New tenant in controller...", newTenant);

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
