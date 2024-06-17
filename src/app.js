import express from 'express';
import dbConnect from './config/dbConnect.js';
import livro from './models/Livro.js';

const connection = await dbConnect();

connection.on("error", (err) => {
    console.error(`Erro de conexão: ${err.message}`);
});

connection.once("open", () => {
    console.log("Conexão estabelecida com sucesso.");
});

const app = express();

app.use(express.json());

app.get('/livros', async (req, res) => {
    const listBooks = await livro.find({}); 
    res.status(200).json(listBooks);
});

app.get('/livros/:id', (req, res) => {
    const index = findIndexById(req.params.id);
    res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso.');
});

app.put('/livros/:id', (req, res) => {
    const index = findIndexById(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).send("Livro atualizado com sucesso.");
});

app.delete('/livros/:id', (req, res) => {
    const index = findIndexById(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro deletado com sucesso.");
})

export default app;
