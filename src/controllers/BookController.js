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
  
    async showByFilter(req, res, next){
        try {
            const query = processQuery(req.query);

            const queryResult = await book.find(query).populate("author").exec();

            if(queryResult.length == 0) return next(new NotFound("Sua pesquisa não encontrou nenhum livro correspondente"))

            res.status(200).json(queryResult);
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

function processQuery(paramsQuery){
    const { title, publisher, minPages, maxPages } = paramsQuery;

    const query = {};

    if(publisher) query.publisher = { $regex: publisher, $options: "i" };
    if(title) query.title = { $regex: title, $options: "i" };

    if(minPages || maxPages) query.pages = {};
    if(minPages) query.pages.$gte = minPages;
    if(maxPages) query.pages.$lte = maxPages;

    return query;
}

export default new BookController();
 