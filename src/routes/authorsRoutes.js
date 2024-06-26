import { Router } from 'express';
import AuthorController from '../controllers/AuthorController.js';
import paginator from '../middlewares/paginator.js';

const router = Router();

router.post('/autores', AuthorController.store);
router.get('/autores', AuthorController.index, paginator);
router.get('/autores/busca', AuthorController.showByFilter, paginator);
router.get('/autores/:id', AuthorController.showById);
router.put('/autores/:id', AuthorController.update);
router.delete('/autores/:id', AuthorController.delete);

export default router;
