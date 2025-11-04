import { Organization } from "../models/organization.model.js";
import { User } from "../models/user.model.js";

export const verifyTenant = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const organizationId = req.user?.organization;

    if (!organizationId) {
      return res.status(400).json({ message: "Unauthorized tenant" });
    }

    // ✅ Verify organization exists
    const orgExists = await Organization.findById(organizationId);
    if (!orgExists) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // ✅ Optional: verify user is actually part of this org
    const user = await User.findById(userId);
    if (!user || user.organization.toString() !== organizationId.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized for this organization" });
    }

    req.organizationId = organizationId;
    next();
  } catch (err) {
    console.error("Tenant verification failed:", err.message);
    res.status(500).json({ message: "Tenant verification error" });
  }
};
