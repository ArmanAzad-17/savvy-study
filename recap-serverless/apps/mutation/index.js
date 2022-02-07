const {
    questionTable
} = require('../seedData');

const {
    GraphQLString,
    GraphQLObjectType,
} = require('graphql');

const {questionType} = require('../graphql-object-type');


const rootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    description: 'question root mutation',
    fields:{
        insert_question:{
            type: questionType,
            args: {
                id: {type: GraphQLString},
                question_title: {type: GraphQLString},
                question_description: {type: GraphQLString},
            },
            resolve: (parent, args, context, info) => {
                const newQuestion = {
                    id:args.id,
                    question_title:args.question_title,
                    question_description: args.question_description
                };
                questionTable.concat(newQuestion);
                return newQuestion;
            }
        },
        
    }
});

module.exports = {
    rootMutation 
}