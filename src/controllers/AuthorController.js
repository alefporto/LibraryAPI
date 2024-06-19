import { author } from '../models/Author.js';

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
            const listAuthors = await author.find(); 
            res.status(200).json(listAuthors);
        } catch(err) {
            next(err);
        }
    }
    
    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);

            if(foundAuthor === null)
                return res.status(404).json({ message: "ID do autor não localizado." });

            return res.status(200).json(foundAuthor);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor(a) atualizado(a) com sucesso." });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next){
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor(a) deletado(a) com sucesso." });
        } catch(err) {
            next(err);
        }
    }
}

export default new AuthorController();
 