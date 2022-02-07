const { graphql } = require('graphql');
const{ schema } = require('./schema');

module.exports.graphqlServer = async (event,context,callback) => {
    try {
        let {query:source} = JSON.parse(event.body);
        return graphql({schema,source}).then(
            result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
        )
    } catch (error) {
        return {
            statusCode: 400, 
            body: JSON.stringify(error,null,2)
        }
    }
  };


