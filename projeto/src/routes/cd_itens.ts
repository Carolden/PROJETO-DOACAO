import { Router } from "express";
import { CD_ItemController } from "../controllers/CD_ItemController";

let router: Router = Router();

let cd_itemController: CD_ItemController = new CD_ItemController();

// router.get('/cd_item', cd_itemController.listar);

// router.get('/cd_item/:id', cd_itemController.buscar);

router.post('/cd_itens', cd_itemController.criar);

// router.put('/cd_item/:id', cd_itemController.atualizar);

// router.delete('/cd_item/:id', cd_itemController.deletar);

export default router;
