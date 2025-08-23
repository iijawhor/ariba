export const verifyTenant = (req, res, next) => {
  //  get the organization/tenant id
  const organizationId = req.user.organizationId;
  console.log("Tenant Id in tenant middleware ... ", organizationId);
  if (!organizationId) {
    return res.status(400).json({ message: "Unauthorized tenant" });
  }
  req.organizationId = organizationId;
  next();
};
