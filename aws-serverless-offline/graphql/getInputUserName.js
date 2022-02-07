const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql')
  
  // This method just inserts the user's first name into the greeting message.
  const getGreeting = firstName => `Hello, ${firstName}.`
  
  // Here we declare the schema and resolvers for the query
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType', // an arbitrary name
      fields: {
        // the query has a field called 'greeting'
        greeting: {
          // we need to know the user's name to greet them
          args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
          // the greeting message is a string
          type: GraphQLString,
          // resolve to a greeting message
          resolve: (parent, args) => getGreeting(args.firstName)
        }
      }
    }),
  })

module.exports.handler = async (event, context, callback) => {
    let {query:source} = JSON.parse(event.body);
    return graphql({schema,source}).then(
    result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
    err => callback(err));
}

// const {
//   graphql,
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLString,
// } = require('graphql');

// let schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return 'world';
//         },
//       },
//     },
//   }),
// });




// module.exports.handler = async (event, context, callback) => {
//   let source = event.queryStringParameters.query
//   return graphql({schema,source}).then(
//     result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
//     err => callback(err)
//   );
// }