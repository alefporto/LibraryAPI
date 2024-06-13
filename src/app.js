import express from 'express';

const app = express();

// Middleware - utilizados pra ter acesso as requisições e fazer algumas ações nelas.
app.use(express.json());

// Mock de dados
const livros = [
    {
        id: 1,
        titulo: "O Hobbit"
    },
    {
        id: 2,
        titulo: "Pessoas normais"
    },
    {
        id: 3,
        titulo: "A Biblioteca da Meia Noite"
    },
    {
        id: 4,
        titulo: "O Alquimista"
    }
]

function findIndexById(id){
    return livros.findIndex(livro => livro.id === Number(id));
}

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
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
