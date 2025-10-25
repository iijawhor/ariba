export const verifyTenant = (req, res, next) => {
  const organizationId = req.user?.organization;
  if (!organizationId) {
    return res.status(400).json({ message: "Unauthorized tenant" });
  }

  // Optionally attach to request for convenience
  req.organizationId = organizationId;

  next();
};
