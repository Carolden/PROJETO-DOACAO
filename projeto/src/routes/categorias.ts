import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

let router: Router = Router();

let categoriaController: CategoriaController = new CategoriaController();

router.get('/categorias', categoriaController.listar);

router.get('/categorias/:id', categoriaController.buscar);

router.post('/categorias', categoriaController.criar);

router.put('/categorias/:id', categoriaController.editar);

router.delete('/categorias/:id', categoriaController.deletar);

export default router;
