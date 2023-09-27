import { Router } from 'express';
import { CidadeController } from '../controllers/CidadeController';

let router: Router = Router();

let cidadeController: CidadeController = new CidadeController();

router.get('/cidades', cidadeController.listar);

router.get('/cidades/:id', cidadeController.buscar);

router.post('/cidades', cidadeController.criar);

router.put('/cidades/:id', cidadeController.editar);

router.delete('/cidades/:id', cidadeController.deletar);

export default router;
