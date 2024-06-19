import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next){
    if(err instanceof mongoose.Error.CastError)
        return res.status(400).json({ message: "Um ou mais dados fornecidos estão incorretos." });

    return res.status(500).json({ message: "Erro interno no servidor." });
};

export default errorHandler;