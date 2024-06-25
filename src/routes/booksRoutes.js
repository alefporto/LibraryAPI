import { Router } from 'express';
import BookController from '../controllers/BookController.js';
import paginator from '../middlewares/paginator.js';

const router = Router();

router.post('/livros', BookController.store);
router.get('/livros', BookController.index, paginator);
router.get('/livros/busca', BookController.showByFilter, paginator);
router.get('/livros/:id', BookController.showById);
router.put('/livros/:id', BookController.update);
router.delete('/livros/:id', BookController.delete);

export default router;
