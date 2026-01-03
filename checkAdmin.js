// middleware/checkAdmin.js
module.exports = function checkAdmin(req, res, next) {
  // Roles from Auth0 JWT
  const roles = req.auth?.['https://studentportal/roles']; 
  if (!roles || !roles.includes('admin')) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
