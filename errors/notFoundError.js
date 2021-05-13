class notFoundError extends Error{
    constructor(message) {
        super(message); 
        this.name = "notFoundError";
    }
}
module.exports = notFoundError;
