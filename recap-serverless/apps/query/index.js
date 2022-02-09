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

const {questionType,categoryType} = require('../graphql-object-type'); 
const {getCategory,getCategoryItem} = require('../service/categoryService')

const rootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    description: 'question root query',
    fields:{
        categories:{
            type: new GraphQLList(categoryType),
            resolve: () => getCategory()
        },
        category:{
            type: categoryType,
            args: {
                sk: {type: GraphQLString}
            },
            resolve: (parent, args, context, info) => getCategoryItem(args.sk)    
        },
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