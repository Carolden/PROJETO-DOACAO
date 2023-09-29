import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
import { Request, Response } from "express";


export class CategoriaController {

  async criar (req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let categoria: Categoria = await Categoria.create({
      nome: body.nome,
    }).save();

    return res.status(200).json(categoria);
  }

  async listar (req: Request, res: Response): Promise<Response> {
    let categoria: Categoria[] = await Categoria.find();

    return res.status(200).json(categoria);
  };

  async atualizar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let categoria: Categoria|null = await Categoria.findOneBy({ id });
    if (! categoria) {
      return res.status(422).json({ error: 'Categoria não encontrada!' });
    }

    categoria.nome = body.nome;
    await categoria.save();

    return res.status(200).json(categoria);
  }

  async buscar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let categoria: Categoria|null = await Categoria.findOneBy({ id });
    if (! categoria) {
      return res.status(422).json({ error: 'Categoria não encontrada!' });
    }

    return res.status(200).json(categoria);
  }

  async deletar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let result = await Categoria
      .createQueryBuilder()
      .update(Categoria)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Categoria não encontrada!' });
  }
}
