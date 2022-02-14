const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLScalarType,
    GraphQLNonNull,   
} = require('graphql');

const messageType = new GraphQLObjectType({
    name: 'Message',
    description: 'message',
    fields:{
        message:{
            type: GraphQLString
        },
    }
});

// const validationMessageType = new GraphQLObjectType({
//     name: 'ValidationMessage',
//     description: 'validation message',
//     fields:{
//         message:{
//             type: new GraphQLNonNull(new GraphQLList(GraphQLString))
//         },
//     }
// });

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

var categoryInfo = new GraphQLScalarType({
    name: 'categoryInfo',
    serialize: categoryINFO,
    parseValue: categoryINFO,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return categoryINFO(ast);
      }
      return 'null';
    }
  });
  
  function categoryINFO(value) {
    return value;
  }


const categoryType = new GraphQLObjectType({
    name: 'Category',
    description: 'categoryInformation',
    fields:{
        sk:{
            type: GraphQLString
        },
        category_info:{
            type: categoryInfo,
        },
        validation_error:{
            type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        }
    }
});


module.exports = {
    categoryInfo,
    categoryType,
    questionType,
    messageType
}