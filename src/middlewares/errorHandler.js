import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next){
    if(err instanceof mongoose.Error.CastError){
        return res.status(400).json({ message: "Um ou mais dados fornecidos estão incorretos." });
    }
    else if(err instanceof mongoose.Error.ValidationError){
        const errMsg = Object.values(err.errors)
            .map(err => err.message)
            .join("; ");
        return res.status(400).json({ message: `Foram encontrados um ou mais erros na validação: ${errMsg}`});
    }
    
    return res.status(500).json({ message: "Erro interno no servidor." });
};

export default errorHandler;