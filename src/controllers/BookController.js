
import book from '../models/Book.js';

class BookController {
    async store(req, res, next){
        try {
            const newBook = await book.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso.", book: newBook });
        } catch(err) {
            next(err);
        }
    }

    async index(req, res, next){
        try {
            const listBooks = await book.find({}).populate("author").exec(); 
            res.status(200).json(listBooks);
        } catch(err) {
            next(err);
        }
    }
  
    async showByPublisher(req, res, next){
        try {
            const publisher = req.query.editora;
            const booksByPublisher = await book.find({ publisher: publisher }).populate("author").exec();
            res.status(200).json(booksByPublisher);
        } catch(err) {
            next(err);
        }
    }

    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id).populate("author").exec();
            
            if(foundBook)
                res.status(200).json(foundBook);
            else
                res.status(404).json({ message: "Não foi encontrado um livro com esse ID", status: 404 })
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next){
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso." });
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next){
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso." });
        } catch(err) {
            next(err);
        }
    }
}

export default new BookController();
 