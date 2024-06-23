import { book } from '../models/modelsIndex.js';
import NotFound from '../errors/NotFound.js';

class BookController {
    async store(req, res, next){
        try {
            const newBook = await book.create(req.body);
            return res.status(201).json({ message: "Livro cadastrado com sucesso.", book: newBook });
        } catch(err) {
            next(err);
        }
    }

    async index(req, res, next){
        try {
            const listBooks = await book.find({}).populate("author").exec(); 
            return res.status(200).json(listBooks);
        } catch(err) {
            next(err);
        }
    }
  
    async showByPublisher(req, res, next){
        try {
            const publisher = req.query.editora;
            const booksByPublisher = await book.find({ publisher: publisher }).populate("author").exec();

            if(booksByPublisher.length == 0)
                return res.status(404).json({ message: "Não foi encontrada uma editora com esse nome", status: 404 });

            res.status(200).json(booksByPublisher);
        } catch(err) {
            next(err);
        }
    }

    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id).populate("author").exec();
            
            if(foundBook === null)
                return next(new NotFound("Não foi encontrado um livro com esse ID"));
                
            res.status(200).json(foundBook);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            const result = await book.findByIdAndUpdate(id, req.body);

            if(result === null)
                return next(new NotFound("Não foi encontrado um livro com esse ID"));

            res.status(200).json({ message: "Livro atualizado com sucesso." });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next){
        try {
            const id = req.params.id;
            const result = await book.findByIdAndDelete(id);

            if(result === null)
                return next(new NotFound("Não foi encontrado um livro com esse ID"));

            res.status(200).json({ message: "Livro deletado com sucesso." });
        } catch(err) {
            next(err);
        }
    }
}

export default new BookController();
 