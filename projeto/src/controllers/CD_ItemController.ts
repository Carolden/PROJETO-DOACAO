import { Request, Response } from "express";
import { CD } from "../models/CD";
import { CD_Item } from "../models/CD_Item";
import { Item } from "../models/Item";

export class CD_ItemController {

  async criar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let idCd = body.idCd;
    let idItem = body.idItem;

    let cd_item = new CD_Item();
    let cd: CD | null = await CD.findOneBy({ id: idCd });
    if (! cd) {
      return res.status(422).json({ error: 'CD não encontrado!' });
    }
    let item: Item | null = await Item.findOneBy({ id: idItem });
    if (! item) {
      return res.status(422).json({ error: 'Item não encontrado!' });
    }
    cd_item.cd = cd;
    cd_item.item = item;
    cd_item.quantidade = body.quantidade;
    await cd_item.save();
    return res.status(200).json(cd_item);
  }

  async entrada (IdCd_item: number, quantidade: number): Promise<CD_Item | null> {

    let cd_item: CD_Item | null = await CD_Item.findOneBy({ id: IdCd_item });
    if (! cd_item) {
      return null;
    }
    cd_item.quantidade += Number(quantidade);
    await cd_item.save();
    return cd_item;
  }

  async saida (IdCd_item: number, quantidade: number): Promise<CD_Item | null> {

    let cd_item: CD_Item | null = await CD_Item.findOneBy({ id: IdCd_item });
    if (! cd_item) {
      return null;
    }
    cd_item.quantidade -= Number(quantidade);
    await cd_item.save();
    return cd_item;
  }
}
