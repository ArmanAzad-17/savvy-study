class NoRecordFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "NoRecordFoundException";
    }
}

class EmailRequiredFiledException extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailRequiredFiledException";
    }
}

class EmptyItemUpdateException extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptyItemUpdateException";
    }
}

class PasswordException extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordException";
    }
}

const noRecordFoundException = (message)=>{
    throw new NoRecordFoundException(message);
};

const emailRequiredFiledException = (message)=>{
    throw new EmailRequiredFiledException(message);
};

const emptyItemUpdateException = (message)=>{
    throw new EmptyItemUpdateException(message);
};

const passwordException = (message)=>{
    throw new PasswordException(message);
};

module.exports={
    noRecordFoundException,
    emailRequiredFiledException,
    emptyItemUpdateException,
    passwordException
}