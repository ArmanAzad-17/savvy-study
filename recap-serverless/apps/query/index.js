const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,  
    GraphQLList, 
} = require('graphql');

const{
    getQuestions,
    getQuestion
} = require('../service/questionService')

const {questionType} = require('../graphql-object-type'); 

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    description: 'question root query',
    fields:{
        questions:{
            type: new GraphQLList(questionType),
            resolve: () => getQuestions()
        },
        question:{
            type: questionType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (parent, args, context, info) => getQuestion(args)    
        } 
    }
});

module.exports = {
    rootQuery
}