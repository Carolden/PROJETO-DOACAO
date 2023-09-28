import { Router } from "express";
import { MovimentacaoController } from "../controllers/MovimentacaoController";

let router: Router = Router();

let movimentacaoController: MovimentacaoController = new MovimentacaoController();

router.get('/movimentacoes', movimentacaoController.listar);

router.get('/movimentacoes/:id', movimentacaoController.buscar);

router.post('/movimentacoes', movimentacaoController.criar);

router.put('/movimentacoes/:id', movimentacaoController.editar);

router.delete('/movimentacoes/:id', movimentacaoController.deletar);

export default router;
