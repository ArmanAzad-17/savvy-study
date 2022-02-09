const { graphql } = require("graphql");
const { schema } = require("./schema");

// var AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-west-2",
//   endpoint: "http://localhost:8000",
//   accessKeyId: "bogusaccesskey",
//   secretAccessKey: "bogussecretkey",
// });

// const dynamodbClient = new AWS.DynamoDB.DocumentClient();

module.exports.graphqlServer = async (event, context, callback) => {
  try {
      let {query:source} = JSON.parse(event.body);
      return graphql({schema,source}).then(
          result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
      )
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({
            errors:error
          },null,2)
      }
  }

  // try {
  //   const { sk, category_info } = JSON.parse(event.body);

  //   const insert_category = await dynamodbClient
  //     .put({
  //       TableName: "GAMES",
  //       Item: {
  //         pk: "categories",
  //         sk: sk,
  //         category_info: [category_info],
  //       },
  //       ConditionExpression: "attribute_not_exists(sk)",
  //     })
  //     .promise();

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(
  //       {
  //         message: "Data inserted successfully",
  //         data: JSON.parse(event.body),
  //       },
  //       null,
  //       2
  //     ),
  //   };
  // } catch (error) {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify(
  //       {
  //         message: "Data insertion unsuccessfully",
  //         errors: error,
  //       },
  //       null,
  //       2
  //     ),
  //   };
  // }
};
