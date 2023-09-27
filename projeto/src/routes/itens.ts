import { Router } from 'express';
import { ItemController } from '../controllers/ItemController'

let router: Router = Router();

let itemController: ItemController = new ItemController();

router.get('/itens', itemController.listar);

router.get('/itens/:id', itemController.buscar);

router.post('/itens', itemController.criar);

router.put('/itens/:id', itemController.editar);

router.delete('/itens/:id', itemController.deletar);

export default router;
