import { Router } from 'express';
import { BeneficiarioController } from './../controllers/BeneficiarioController';

let router: Router = Router();

let beneficiarioController: BeneficiarioController = new BeneficiarioController();

router.get('/beneficiarios', beneficiarioController.listar);

router.get('/beneficiarios/:id', beneficiarioController.buscar);

router.post('/beneficiarios', beneficiarioController.criar);

router.put('/beneficiarios/:id', beneficiarioController.editar);

router.delete('/beneficiarios/:id', beneficiarioController.deletar);

export default router;
