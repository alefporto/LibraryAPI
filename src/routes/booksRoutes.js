import { Router } from 'express';
import BookController from '../controllers/BookController.js';

const router = Router();

router.post('/livros', BookController.store);
router.get('/livros', BookController.index);
router.get('/livros/:id', BookController.showById);
router.put('/livros/:id', BookController.update);
router.delete('/livros/:id', BookController.delete);

export default router;
