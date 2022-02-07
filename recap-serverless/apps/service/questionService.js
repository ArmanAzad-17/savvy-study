const {
    questionTable
} = require('../seedData');

const getQuestions = (args)=>{
    return questionTable;  
}

const getQuestion = (args)=>{
    const {id} = args; 
    return questionTable.find(question => question.id === id )
}

module.exports = {
    getQuestions,
    getQuestion
}