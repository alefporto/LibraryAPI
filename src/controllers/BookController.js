import { author } from '../models/Author.js';
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
            const booksByPublisher = await book.find({ publisher: publisher });
            res.status(200).json(booksByPublisher);
        } catch(err) {
            next(err);
        }
    }

    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id);
            res.status(200).json(foundBook);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next){
        try {
            const bodyData = req.body;
            const bookUpdateData = { ...bodyData };
            const id = req.params.id;
            
            if(bodyData.author)
                bookUpdateData.author = await author.findById(bodyData.author);

            await book.findByIdAndUpdate(id, bookUpdateData);

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
 