import { Response, Request } from "express";
import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
// import { CD } from "../models/CD";
// import { CategoriaController } from "./CategoriaController";
// import { Movimentacao } from "../models/Movimentacao";

export class ItemController {

  async criar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let item: Item = new Item();

    item.nome = body.nome;
    let cat: Categoria | null = await Categoria.findOneBy({ id: body.idCategoria });
    if (!cat) {
      return res.status(422).json({ error: 'Categoria não encontrado!' });
    }
    item.categoria = cat;
    await item.save();
    return res.status(200).json(item);
  }


  async listar (req: Request, res: Response): Promise<Response> {
    let itens: Item[] = await Item.find({
      relations: {
        categoria: true,
      }
    });
    return res.status(200).json(itens);
  }


  async editar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let item: Item | null = await Item.findOneBy({ id: body.id })
    if (! item) {
      return res.status(422).json({ error: 'Item não encontrado!' });
    }
    item.nome = body.nome;
    let idCategoria: number = Number(body.idCategoria);
    let cat: Categoria | null = await Categoria.findOneBy({id:idCategoria});
    if (! cat) {
      return res.status(422).json({ error: 'Categoria não encontrada!' });
    }
    item.categoria = cat;
    await item.save();

    return res.status(200).json(item);
  }

  async buscar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);
    let item: Item | null = await Item.findOneBy({ id: id });
    if (! item) {
      return res.status(422).json({ error: 'Item não encontrado!' });
    }
    return res.status(200).json(item);
  }

  async deletar (req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    let result = await Item
      .createQueryBuilder()
      .update(Item)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Item não encontrado!' });
  }
}
