import book from '../models/Book.js';

class BookController {
    async index(req, res){ // static - serve pra não precisar instanciar um objecto pra usar o metodo
        try {
            const listBooks = await book.find(); 
            res.status(200).json(listBooks);
        } catch(err) {
            res.status(404).json({ message: `Erro na requisição: ${err.message}.`});
        }
    }
    
    async store(req, res){
        try {
            const newBook = await book.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso.", book: newBook });
        } catch(err) {
            res.status(500).json({ message: `Erro ao cadastrar livro: ${err.message}.` });
        }
    }
;}

export default new BookController();
 