import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest{
    constructor(err){
        const errMsg = Object.values(err.errors)
            .map(err => err.message)
            .join("; ");
        super(`Foram encontrados um ou mais erros na validação: ${errMsg}`);
    }
}

export default ValidationError;