var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "bogusaccesskey",
  secretAccessKey: "bogussecretkey",
});

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const getCategory = async (event, context, callback) => {

  let promisesTableInfo = '' ;
  try {
    const game_engine_scan = await dynamodbClient
      .scan({
        TableName: "Game_Engines",
      })
      .promise();

    console.log(game_engine_scan);
    promisesTableInfo = game_engine_scan
  } catch (errors) {
    console.log("Cath blocks", errors);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Conection success on dynamdob",
        dynamodb: dynamodbClient,
        dynamoTableInfo: promisesTableInfo,
      },
      null,
      2
    ),
  };
};

exports.handler = getCategory;
