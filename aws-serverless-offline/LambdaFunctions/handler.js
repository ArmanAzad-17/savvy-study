module.exports.hello = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello Serverless world! Your function executed successfully!',
        input: event,
        context: context
      },
      null,
      2
    ),
  };
};
