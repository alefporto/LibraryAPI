import { Router } from 'express';
import PublisherController from '../controllers/PublisherController.js';
import paginator from '../middlewares/paginator.js';

const router = Router();

router.post('/editoras', PublisherController.store);
router.get('/editoras', PublisherController.index, paginator);
router.get('/editoras/busca', PublisherController.showByFilter, paginator);
router.get('/editoras/:id', PublisherController.showById);
router.put('/editoras/:id', PublisherController.update);
router.delete('/editoras/:id', PublisherController.delete);

export default router;