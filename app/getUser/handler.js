const { sendResponse } = require("../helper");

module.exports.index = async (event) => {
    return sendResponse(200, {
      message: `Email ${event.requestContext.authorizer.claims.email} has been authorized`
    })
  }