import book from '../models/Book.js';

class BookController {
    async store(req, res){
        try {
            const newBook = await book.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso.", book: newBook });
        } catch(err) {
            res.status(500).json({ message: `Falha ao cadastrar livro: ${err.message}.` });
        }
    }

    async index(req, res){ // static - serve pra não precisar instanciar um objecto pra usar o metodo
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
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
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
 