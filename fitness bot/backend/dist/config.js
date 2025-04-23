"use strict";
const JwtWebToken = process.env.JSON_WEB_SECRET;
// if (!JwtWebToken) {
//     throw new Error("JWT secret is not defined in the environment variables!");
// }
module.exports = JwtWebToken; // Export the secret for use in other files
