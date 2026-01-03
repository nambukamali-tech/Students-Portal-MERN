const jwtBearer = require("express-oauth2-jwt-bearer");

const checkJwt = jwtBearer.auth({
  audience: "https://student-portal-api",
  issuerBaseURL: "https://dev-x00nmzoa4yp5af6n.us.auth0.com/",
});

module.exports = checkJwt;
