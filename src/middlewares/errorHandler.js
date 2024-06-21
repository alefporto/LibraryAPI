import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next){
    if(err instanceof mongoose.Error.CastError)
        return new IncorrectRequest().sendResponse(res);
    else if(err instanceof mongoose.Error.ValidationError)
        return new ValidationError(err).sendResponse(res);

    return new BaseError().sendResponse(res);
};

export default errorHandler;