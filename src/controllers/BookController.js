import { author } from '../models/Author.js';
import book from '../models/Book.js';

class BookController {
    async store(req, res){
        const newBookRequest = req.body; 
        
        try {
            const foundAuthor = await author.findById(newBookRequest.author);

            const completeBook = { ...newBookRequest, author: foundAuthor._doc };

            const createdBook = await book.create(completeBook);
            
            res.status(201).json({ message: "Livro cadastrado com sucesso.", book: createdBook });
        } catch(err) {
            res.status(500).json({ message: `Falha ao cadastrar livro: ${err.message}.` });
        }
    }

    async index(req, res){
        try {
            const listBooks = await book.find(); 
            res.status(200).json(listBooks);
        } catch(err) {
            res.status(500).json({ message: `Falha na requisição dos livros: ${err.message}.`});
        }
    }
    
    async showById(req, res){
        try {
            const id = req.params.id;
            const foundBook = await book.findById(id);
            res.status(200).json(foundBook);
        } catch(err) {
            res.status(500).json({ message: `Falha na requisição do livro: ${err.message}.` });
        }
    }

    async update(req, res){
        const bodyData = req.body;

        try {
            const id = req.params.id;
            
            const foundAuthor = await author.findById(bodyData.author);
            
            const bookUpdateData = { ...bodyData, author: foundAuthor._doc };

            await book.findByIdAndUpdate(id, bookUpdateData);

            res.status(200).json({ message: "Livro atualizado com sucesso." });
        } catch(err) {
            res.status(500).json({ message: `Falha ao atualizar livro: ${err.message}.` });
        }
    }

    async delete(req, res){
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso." });
        } catch(err) {
            res.status(500).json({ message: `Falha ao deletar livro: ${err.message}.` });
        }
    }
}

export default new BookController();
 