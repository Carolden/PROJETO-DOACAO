import { Router } from 'express';
import { CdController } from '../controllers/CdController';

let router: Router = Router();

let cdController: CdController = new CdController();

router.get('/cds', cdController.listar);

router.get('/cds/:id', cdController.buscar);

router.post('/cds', cdController.criar);

router.put('/cds/:id', cdController.editar);

router.delete('/cds/:id', cdController.deletar);

export default router;
