// middleware/checkPermission.js
module.exports = function checkPermission(requiredPermission) {
  return (req, res, next) => {
    // JWT permissions are usually under: req.auth['permissions'] OR req.auth['https://studentportal/permissions']
    const permissions = req.auth?.permissions || req.auth?.['https://studentportal/permissions'] || [];

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};
