export const authorizedRolesMiddleware = (...permittedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    if (!permittedRoles.includes(req.user.role))
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient permissions" });

    next();
  };
};
