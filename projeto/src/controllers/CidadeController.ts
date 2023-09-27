import { Response, Request } from "express";
import { Cidade } from "../models/Cidade";

export class CidadeController {

  async criar (req: Request, res: Response): Promise<Response> {
    let nome = req.params.nome;
    let cidade = await Cidade.create({
      nome,
    }).save();
    return res.status(200).json(cidade);
  }

  async listar (req: Request, res: Response): Promise<Response> {
    const cidadeRepository = Cidade;
    let cidades = await cidadeRepository
      .createQueryBuilder('cidade')
      .where('cidade.situacao != :situacao', { situacao: 'I' })
      .getMany();
      return res.status(200).json(cidades);
  }

  async buscar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);
    let cidade: Cidade | null = await Cidade.findOneBy({ id: id });
    if (! cidade) {
      return res.status(422).json({ error: 'Cidade não encontrada!' });
    }
    return res.status(200).json(cidade);
  }

  async editar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let cidade: Cidade | null = await Cidade.findOneBy({ id: body.id });
    if (! cidade) {
      return res.status(422).json({ error: 'Cidade não encontrada!' });
    }
    cidade.nome = body.nome;
    await cidade.save();
    return res.status(200).json(cidade);
  }

  async deletar (req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    let result = await Cidade
      .createQueryBuilder()
      .update(Cidade)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Cidade não encontrada!' });
  }
}
