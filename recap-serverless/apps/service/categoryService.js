const {
    questionTable
} = require('../seedData');

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "bogusaccesskey",
  secretAccessKey: "bogussecretkey",
});

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const getCategory = async () => {
  try {
    const game_engine_scan = await dynamodbClient
      .query({
        TableName : "GAMES",
        KeyConditionExpression: "pk = :name",
        ExpressionAttributeValues: {
          ":name": "categories"
        },
        ProjectionExpression: "sk,category_info"
      })
      .promise();
    return game_engine_scan.Items;
  } catch (errors) {
    return errors;
  }
};

const getCategoryItem = async (sk) => {
  try {
    const game_engine_scan = await dynamodbClient.get({
        TableName : "GAMES",
        Key:{
          pk:"categories",
          sk:sk
        },
        ProjectionExpression: "sk,category_info"
      })
      .promise();
    console.log(game_engine_scan);
    return game_engine_scan.Item;
  } catch (errors) {
    return errors;
  }
};

const createCategoryItem = async (sk,category_info) => {
  try {
    await dynamodbClient.put({
            TableName: "GAMES",
            Item: {
              pk: "categories",
              sk: sk,
              category_info: [category_info],
            },
            ConditionExpression: "attribute_not_exists(sk)",
          })
      .promise();
    return {"sk":sk,"category_info":[category_info]};
  } catch (errors) {
    return errors;
  }
};

const updateCategoryItem = async (sk,category_info) => {
  try {
    const update_category_item = await dynamodbClient.update({
            TableName: "GAMES",
            Key:{
              pk:"categories",
              sk:sk
            },
            UpdateExpression: "set category_info = :updated_value",
            ExpressionAttributeValues:{
                ":updated_value": category_info
            },
            ReturnValues:"ALL_NEW"
          })
      .promise();

    console.log(update_category_item);
    return update_category_item.Attributes;
  } catch (errors) {
    return errors;
  }
};

const deleteCategoryItem = async (sk) => {
  try {
    const delete_category_item = await dynamodbClient.delete({
            TableName: "GAMES",
            Key:{
              pk:"categories",
              sk:sk
            }
          })
      .promise();
    console.log(delete_category_item);
    return {message: 'Category item deleted'};
  } catch (errors) {
    return errors;
  }
};

// const getCategoryByID = async (sk) => {
//   try {
//     const game_engine_scan = await dynamodbClient
//       .query({
//         TableName : "GAMES",
//         KeyConditionExpression: "pk = :name and begins_with(sk, :category_id)",
//         ExpressionAttributeValues: {
//           ":name": "categories",
//           ":category_id": sk
//         },
//         ProjectionExpression: "sk,category_info"
//       })
//       .promise();

//     console.log(game_engine_scan);
//     return game_engine_scan.Items;
//   } catch (errors) {
//     console.log("Cath blocks", errors);
//     return errors;
//   }
// };

module.exports = {
    getCategory,
    getCategoryItem,
    createCategoryItem,
    updateCategoryItem,
    deleteCategoryItem
}