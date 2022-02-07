const {
    GraphQLSchema 
} = require('graphql');

const{
    rootQuery
} = require('../query');

const{
    rootMutation
} = require('../mutation');

const schema = new GraphQLSchema({
    query:rootQuery,
    mutation:rootMutation
});


module.exports = {
    schema
}