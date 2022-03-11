const { noRecordFoundException, emptyItemUpdateException, passwordException } = require("../../utils/customException");
const { dynamodbClient } = require("../dbService");
const AWS = require("aws-sdk");

const cognito = new AWS.CognitoIdentityServiceProvider();

const getUserById = async (id, callback) => {
  try {
    const user = await dynamodbClient
      .get({
        TableName: "demoSavvyTable",
        Key: {
          PK: `user#${id}`,
          SK: `user#${id}`,
        },
        // ProjectionExpression: "SK,category_info"
      })
      .promise();

    if (!user.Item) {
      noRecordFoundException("No record found by this id");
    }
    return user.Item;
  } catch (error) {
    callback(error);
  }
};

const registerUser = async (
  first_name,
  last_name,
  email,
  phone_number,
  password,
  callback
) => {
  try {

    if(password.length < 6){
      passwordException('Password length minimum 6 character length');
    }

    const { user_pool_id } = process.env;
    const params = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      MessageAction: "SUPPRESS",
    };

    const response = await cognito.adminCreateUser(params).promise();

    if (response.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId: user_pool_id,
        Username: email,
        Permanent: true,
      };
      await cognito.adminSetUserPassword(paramsForSetPass).promise();
      await dynamodbClient
        .put({
          TableName: "demoSavvyTable",
          Item: {
            PK: `user#${response.User.Attributes[0].Value}`,
            SK: `user#${response.User.Attributes[0].Value}`,
            type: "user",
            first_name: first_name ?? "",
            last_name: last_name ?? "",
            email: email,
            phone_number: phone_number ?? "",
          },
          //   ConditionExpression: "attribute_not_exists(PK)",
          //   ProjectionExpression: "SK,category_info"
        })
        .promise();
      return {
        errors: false,
        message: "User registration successfully",
      };
    }
  } catch (error) {
    callback(error);
  }
};

const userLogin = async (email, password, callback) => {
  try {
    const { user_pool_id, client_id } = process.env;
    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: user_pool_id,
      ClientId: client_id,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const response = await cognito.adminInitiateAuth(params).promise();
    return { token_id: response.AuthenticationResult.IdToken };
  } catch (error) {
    callback(error);
  }
};

const updateUser = async (id,first_name,last_name,phone_number,callback) => {
  try {
    let updateItems = [];
    let updateItemsExpression = {};
    
    first_name && (updateItemsExpression = {...updateItemsExpression,":first_name": first_name}, updateItems.push(`first_name = :first_name`));
    last_name && (updateItemsExpression = {...updateItemsExpression,":last_name": last_name},updateItems.push(`last_name = :last_name`));
    phone_number && (updateItemsExpression = {...updateItemsExpression,":phone_number": phone_number},updateItems.push(`phone_number = :phone_number`));

    if(Object.keys(updateItemsExpression).length === 0){
      emptyItemUpdateException('No item request for update');
    }

    const user = await dynamodbClient
      .update({
        TableName: "demoSavvyTable",
        Key: {
          PK: `user#${id}`,
          SK: `user#${id}`,
        },
        UpdateExpression: `set ${updateItems.join(',')}`,
        ExpressionAttributeValues:updateItemsExpression,
        ReturnValues:"ALL_NEW"
        // ProjectionExpression: "SK,category_info"
      })
      .promise();

    if (!user.Attributes) {
      noRecordFoundException("No record found by this id");
    }
    return user.Attributes;
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  getUserById,
  registerUser,
  userLogin,
  updateUser
};
