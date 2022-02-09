const {
    questionTable
} = require('../seedData');

const {
    GraphQLString,
    GraphQLObjectType,
} = require('graphql');

const {categoryType,questionType,messageType} = require('../graphql-object-type');
const {createCategoryItem,updateCategoryItem,deleteCategoryItem} = require('../service/categoryService');


const rootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    description: 'root mutation',
    fields:{
        insert_category:{
            type: categoryType,
            args: {
                sk: {type: GraphQLString},
                category_info: {type: GraphQLString},
            },
            resolve: (parent, args, context, info) => {
                return createCategoryItem(args.sk,args.category_info).then(
                    response => response
                );
            }

        },
        update_category:{
            type: categoryType,
            args: {
                sk: {type: GraphQLString},
                category_info: {type: GraphQLString},
            },
            resolve: (parent, args, context, info) => {
                return updateCategoryItem(args.sk,args.category_info).then(
                    response => response
                );
            }

        },
        delete_category:{
            type: messageType,
            args: {
                sk: {type: GraphQLString}
            },
            resolve: (parent, args, context, info) => {
                return deleteCategoryItem(args.sk).then(
                    response => response
                );
            }

        },
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