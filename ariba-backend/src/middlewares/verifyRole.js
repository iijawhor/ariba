export const validateRole = (userRole = []) => {
  return (req, res, next) => {
    if (!req.user || !userRole.includes(req.user.userRole)) {
      return res
        .status(403)
        .json({ message: `Forbidden: ${userRole.join(", ")} only` });
    }
    next();
  };
};
