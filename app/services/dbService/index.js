var AWS = require("aws-sdk");

const dynamodbClient = new AWS.DynamoDB.DocumentClient();
module.exports = {
    dynamodbClient
}