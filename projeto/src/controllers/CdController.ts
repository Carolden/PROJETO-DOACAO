import { Response, Request } from "express";
import { Beneficiario } from "../models/Beneficiario";
import { CD } from "../models/CD";
import { Cidade } from "../models/Cidade";

export class CdController {

  async criar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let idCidade = body.cidade.id;
    let cidade: Cidade | null = await Cidade.findOneBy({ id: idCidade });
    if (! cidade){
      return res.status(422).json({ error: 'Cidade não encontrada!' });
    }
    let cd =  await CD.create({
      nome: body.nome,
      cidade: cidade,
    }).save();

    return res.status(200).json(cd);
  }

  async listar (req: Request, res: Response): Promise<Response> {
    const CdRepository = CD;
    let cds =  await CdRepository
      .createQueryBuilder('cd')
      .where('cd.situacao != :situacao', { situacao: 'I' })
      .getMany();
      return res.status(200).json(cds);
  }

  async buscar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);
    let cd: CD | null = await CD.findOneBy({ id: id });
    if (! cd) {
      return res.status(422).json({ error: 'Centro de distribuição não encontrado!' });
    }
    return res.status(200).json(cd);
  }

  async editar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let cd: CD | null = await CD.findOneBy({ id: body.id })
    if (! cd) {
      return res.status(422).json({ error: 'Centro de distribuição não encontrado!' });
    }
    let idCidade = body.cidade.id;
    let cidade: Cidade | null = await Cidade.findOneBy({ id: idCidade });
    if (! cidade){
      return res.status(422).json({ error: 'Cidade não encontrada!' });
    }
    cd.nome = body.nome;
    cd.cidade = cidade;
    cd.situacao = body.situacao;
    await cd.save();

    return res.status(200).json(cd);
  }

  async deletar (req: Request, res: Response): Promise<Response> {
    let id = req.params.id;
    let result = await CD
      .createQueryBuilder()
      .update(CD)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Centro de distribuição não encontrado!' });
  }
}
