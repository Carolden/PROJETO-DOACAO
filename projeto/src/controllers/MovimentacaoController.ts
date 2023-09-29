import { Request, Response } from "express";
import { Movimentacao } from "../models/Movimentacao";
import { Beneficiario } from "../models/Beneficiario";
import { CD_ItemController } from "./CD_ItemController";
import { CD_Item } from "../models/CD_Item";

export class MovimentacaoController {

  async criar(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let movimentacao: Movimentacao = new Movimentacao();
    let cd_itemController = new CD_ItemController();
    let cd_item: CD_Item | null = await CD_Item.findOneBy({ itemId: body.itemId, cdId: body.cdId });

    if (!cd_item) {
      cd_item = await cd_itemController.criar(body.idCd, body.idItem, body.quantidade);
    }

    if (cd_item != null) {
      if (body.tipo = 'E') {
        cd_item = await cd_itemController.entrada(cd_item.id, body.qtd);
      } else if (body.tipo = 'S') {
        cd_item = await cd_itemController.saida(cd_item.id, body.qtd);
      }
    }

    if (!cd_item) {
      return res.status(422).json({ error: 'Ops, algo deu errado!' });
    }

    movimentacao.tipo = body.tipo;
    movimentacao.quantidade = body.quantidade;
    movimentacao.doador = body.doador;
    movimentacao.cd_item = cd_item;
    let beneficiario = await Beneficiario.findOneBy({ id: body.idBeneficiario });
    if (beneficiario) {
      movimentacao.beneficiario = beneficiario;
    }
    await movimentacao.save();
    return res.status(200).json(movimentacao);
  }

  async listar(req: Request, res: Response): Promise<Response> {
    let movimentacoes: Movimentacao[] = await Movimentacao.find();

    return res.status(200).json(movimentacoes);
  }

  async editar(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({ id });
    if (!movimentacao) {
      return res.status(422).json({ error: 'Movimentação não encontrada!' });
    }

    movimentacao.tipo = body.tipo;
    movimentacao.quantidade = body.quantidade;
    movimentacao.doador = body.doador;
    let beneficiario = await Beneficiario.findOneBy({ id: body.idBeneficiario });
    if (beneficiario) {
      movimentacao.beneficiario = beneficiario;
    }
    let cd_item: CD_Item | null = await CD_Item.findOneBy({ id: body.idCd_item });
    if (!cd_item) {
      return res.status(422).json({ error: 'Item não encontrado!' });
    }
    movimentacao.cd_item = cd_item;
    await movimentacao.save();
    return res.status(200).json(movimentacao);
  }

  async buscar(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({ id: id });
    if (!movimentacao) {
      return res.status(422).json({ error: 'Movimentação não encontrada!' });
    }
    return res.status(200).json(movimentacao);
  }

  async deletar(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let result = await Movimentacao
      .createQueryBuilder()
      .update(Movimentacao)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Movimentação não encontrada!' });
  }
}
