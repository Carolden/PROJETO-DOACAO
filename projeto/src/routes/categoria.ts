import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

let router: Router = Router();

let categoriaController: CategoriaController = new CategoriaController();

router.get('/categoria', categoriaController.listar);

router.get('/categoria/:id', categoriaController.buscar);

router.post('/categoria', categoriaController.criar);

router.put('/categoria/:id', categoriaController.atualizar);

router.delete('/categoria/:id', categoriaController.deletar);

export default router;
