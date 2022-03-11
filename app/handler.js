const {
  getUserById,
  registerUser,
  userLogin,
  updateUser,
} = require("./services/userService");
const { noRecordFoundException } = require("./utils/customException");

module.exports.savvyApp = async (event, context, callback) => {

  try {
    let responses = "";

    switch (event.info.fieldName) {
      case "getMyProfile":
        responses = await getUserById(
          event.identity.claims.sub,
          callback
        );
        break;
      case "registerUser":
        responses = await registerUser(
          event.arguments.input.first_name ?? null,
          event.arguments.input.last_name ?? null,
          event.arguments.input.email,
          event.arguments.input.phone_number,
          event.arguments.input.password,
          callback
        );
        break;
      case "updateMyProfile":
        responses = await updateUser(
          event.identity.claims.sub,
          event.arguments.input.first_name ?? null,
          event.arguments.input.last_name ?? null,
          event.arguments.input.phone_number,
          callback
        );
        break;
      case "getSignIn":
        responses = await userLogin(
          event.arguments.email,
          event.arguments.password,
          callback
        );
        break;
      default:
        noRecordFoundException("No graphql query function not found");
        break;
    }
    return responses;
  } catch (error) {
    callback(error);
  }
};
