import { Router } from 'express';
import BookController from '../controllers/BookController.js';

const router = Router();

router.post('/livros', BookController.store);
router.get('/livros', BookController.index);

// router.get('/livros/:id', (req, res) => {
//     const index = findIndexById(req.params.id);
//     res.status(200).json(livros[index]);
// });

// router.put('/livros/:id', (req, res) => {
//     const index = findIndexById(req.params.id);
//     livros[index].titulo = req.body.titulo;
//     res.status(200).send("Livro atualizado com sucesso.");
// });

// router.delete('/livros/:id', (req, res) => {
//     const index = findIndexById(req.params.id);
//     livros.splice(index, 1);
//     res.status(200).send("Livro deletado com sucesso.");
// })

export default router;
