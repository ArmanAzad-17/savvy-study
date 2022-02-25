'use strict';
exports.handler = async (event,context,callback) => {
  let responses = '';

  switch (event.info.fieldName) {
    case 'getMessage':
      responses = {data:'Well comr serverless appsync graphql !'}
      break;
    case 'listUsers':
        responses = [{
          user_id: '31f41a41-14f2-4209-bdf3-c2739b5a63fd',
          user_email: 'armanazad.sakib@gmail.com',
          user_name: 'Arman azad'
        }];
      break;
    default:
      responses = {data:'Sorry no query found'}
      break;
  }

  console.log(responses);

  return responses;
};
