import { author } from '../models/modelsIndex.js';
import NotFound from '../errors/NotFound.js';

class AuthorController {
    async store(req, res, next){
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "Autor(a) cadastrado(a) com sucesso.", author: newAuthor });
        } catch(err) {
            next(err);
        }
    }

    async index(req, res, next){
        try {
            const listAuthors = author.find();

            req.result = listAuthors;

            next();
        } catch(err) {
            next(err);
        }
    }
    
    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            
            if(foundAuthor === null)
                return next(new NotFound("Não foi encontrado(a) um(a) autor(a) com esse ID"));
            
            res.status(200).json(foundAuthor);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            const result = await author.findByIdAndUpdate(id, req.body);
            
            if(result === null)
                return next(new NotFound("Não foi encontrado(a) um(a) autor(a) com esse ID"));

            res.status(200).json({ message: "Autor(a) atualizado(a) com sucesso." });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next){
        try {
            const id = req.params.id;
            const result = await author.findByIdAndDelete(id);
            
            if(result === null)
                return next(new NotFound("Não foi encontrado(a) um(a) autor(a) com esse ID"));

            res.status(200).json({ message: "Autor(a) deletado(a) com sucesso." });
        } catch(err) {
            next(err);
        }
    }
}

export default new AuthorController();
 