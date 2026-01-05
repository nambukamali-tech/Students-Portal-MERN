module.exports = function populatePermissions(req, res, next) {
  if (!req.auth || !req.auth.payload) return next();

  // Attach permissions array to req.auth.permissions
  req.auth.permissions = req.auth.payload.permissions || [];
  next();
};
