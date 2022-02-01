module.exports.createUser = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Created user service!",
        lamdaFunction_argumntes: {event, context},
      },
      null,
      2
    ),
  };
};