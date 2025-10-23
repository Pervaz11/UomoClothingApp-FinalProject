module.exports = (requiredRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({
        success: false,
        message: "User role not assigned!",
        statusCode: 403
      });
    }

    const rolesArray = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!rolesArray.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission for this operation!",
        requiredRoles,
        userRole,
        statusCode: 403
      });
    }
    next();
  };
};