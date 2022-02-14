const ApiErrors = class ApiErrors {
    
    /**
     * 
     */
    constructor(obj){
        this.name = obj.name;
        this.message = obj.message || '';
        this.status = obj.httpStatusCode || 500;
        this.stack = obj.stack || (new Error()).stack || '';
    }
}
module.exports = ApiErrors