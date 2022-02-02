var { graphql, buildSchema } = require("graphql");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var rootValue = {
  hello: () => {
    return "Hello world!";
  },
};


exports.handler = async (event, context, callback) => {
  return graphql({
    schema,
    source: "{ hello }",
    rootValue,
  }).then((response) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        graphql: response,
        event: event,
        context: context
      })});
  });
};
