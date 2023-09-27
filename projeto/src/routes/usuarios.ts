import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

let router: Router = Router();

let usuarioController: UsuarioController = new UsuarioController();

router.get('/usuarios', usuarioController.listar);

router.get('/usuarios/:id', usuarioController.buscar);

router.post('/usuarios', usuarioController.criar);

router.put('/usuarios/:id', usuarioController.atualizar);

router.delete('/usuarios/:id', usuarioController.deletar);

export default router;
