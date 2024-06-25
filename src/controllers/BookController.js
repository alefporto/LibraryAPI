import { author, book } from '../models/modelsIndex.js';
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
            const queryBooks = book.find();
            
            req.result = queryBooks;

            next();
        } catch(err) {
            next(err);
        }
    }
  
    async showByFilter(req, res, next){
        try {
            const query = await processQuery(req.query);

            const queryResult = book.find(query);

            req.result = queryResult;

            next();
        } catch(err) {
            next(err);
        }
    }

    async showById(req, res, next){
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id, {}, { autopopulate: false }).populate("author");
            
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

async function processQuery(paramsQuery){
    const { title, publisher, authorName, minPages, maxPages } = paramsQuery;

    const query = {};

    if(publisher) query.publisher = { $regex: publisher, $options: "i" };
    if(title) query.title = { $regex: title, $options: "i" };

    if(authorName){
        const correspondingAuthor = await author.findOne({ name: { $regex: authorName, $options: "i" } });

        if(correspondingAuthor === null)
            query.author = null;
        else
            query.author = correspondingAuthor._id;
    }

    if(minPages || maxPages){
        query.pages = {};
        if(minPages) query.pages.$gte = minPages;
        if(maxPages) query.pages.$lte = maxPages;
    }

    return query;
}

export default new BookController();
