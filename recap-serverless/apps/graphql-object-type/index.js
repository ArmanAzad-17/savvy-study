const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,   
} = require('graphql');

const questionType = new GraphQLObjectType({
    name: 'Question',
    description: 'questionInformation',
    fields:{
        id:{
            type: GraphQLString
        },
        question_title:{
            type: GraphQLString
        },
        question_description:{
            type: GraphQLString
        }
    }
});

module.exports = {
    questionType
}