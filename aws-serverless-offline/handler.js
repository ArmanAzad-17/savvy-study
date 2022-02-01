module.exports.hello = async (event, context, callback) => {
  // console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello Serverless world! Your function executed successfully!',
        input: context,
      },
      null,
      2
    ),
  };
};
