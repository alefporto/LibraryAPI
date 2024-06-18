import { author } from '../models/Author.js';

class AuthorController {
    async store(req, res){
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "Autor(a) cadastrado(a) com sucesso.", author: newAuthor });
        } catch(err) {
            res.status(500).json({ message: `Falha ao cadastrar autor(a): ${err.message}.` });
        }
    }

    async index(req, res){
        try {
            const listAuthors = await author.find(); 
            res.status(200).json(listAuthors);
        } catch(err) {
            res.status(500).json({ message: `Falha na requisição dos(as) autores(as): ${err.message}.`});
        }
    }
    
    async showById(req, res){
        try {
            const id = req.params.id;
            const foundAuthor = await author.findById(id);
            res.status(200).json(foundAuthor);
        } catch(err) {
            res.status(500).json({ message: `Falha na requisição do(a) autor(a): ${err.message}.` });
        }
    }

    async update(req, res){
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor(a) atualizado(a) com sucesso." });
        } catch(err) {
            res.status(500).json({ message: `Falha ao atualizar autor(a): ${err.message}.` });
        }
    }

    async delete(req, res){
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor(a) deletado(a) com sucesso." });
        } catch(err) {
            res.status(500).json({ message: `Falha ao deletar autor(a): ${err.message}.` });
        }
    }
}

export default new AuthorController();
 