const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://student-portal-api",
  issuerBaseURL: "https://dev-x00nmzoa4yp5af6n.us.auth0.com/",
});

module.exports = function (req, res, next) {
  checkJwt(req, res, (err) => {
    if (err) return res.status(err.status || 401).json({ message: err.message });

    // Map Auth0 custom claim to permissions
    // Make sure the claim URL matches what you used in Auth0 (e.g., "https://studentportal/permissions")
    req.auth = req.auth || {};
    req.auth.permissions = req.auth?.["https://studentportal/permissions"] || [];
    next();
  });
};
