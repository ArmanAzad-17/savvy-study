'use strict';

exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Dynamodb users list',
        input: event,
      },
      null,
      2
    ),
  };
};
