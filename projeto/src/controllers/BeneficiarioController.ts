import { Response, Request } from "express";
import { Beneficiario } from "../models/Beneficiario";
import { Cidade } from "../models/Cidade";

export class BeneficiarioController {

    async criar (req: Request, res: Response): Promise<Response> {
      let body = req.body;
      let beneficiario: Beneficiario = new Beneficiario();

      beneficiario.nome = body.nome;
      let cidade: Cidade | null = await Cidade.findOneBy({id: body.idCidade});
      if (cidade) {
        beneficiario.cidade = cidade;
      } else {
        return res.status(422).json({ error: 'Cidade não encontrada!' });
      }
      await beneficiario.save();
      return res.status(200).json(beneficiario);
    }

  async listar (req: Request, res: Response): Promise<Response> {
    let beneficiarios: Beneficiario[] = await Beneficiario.find({
      relations: {
        cidade: true,
      }
    });
    return res.status(200).json(beneficiarios);
  }

  async buscar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);
    let beneficiario: Beneficiario | null = await Beneficiario.findOneBy({ id: id });
    if (! beneficiario) {
      return res.status(422).json({ error: 'Beneficiário não encontrado!' });
    }
    return res.status(200).json(beneficiario);
  }

  async editar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);
    let idCidade = Number(body.idCidade)
    let beneficiario: Beneficiario | null = await Beneficiario.findOneBy({ id: id });

    if (! beneficiario) {
      return res.status(422).json({ error: 'Beneficiário não encontrado!' });
    }

    beneficiario.nome = body.nome;
    let cidade: Cidade | null = await Cidade.findOneBy({ id: idCidade });
    if (cidade) {
      beneficiario.cidade = cidade;
    } else {
      return res.status(422).json({ error: 'Cidade não encontrada!' });
    }
    beneficiario.save();
    return res.status(200).json(beneficiario);
  }

    async deletar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let result = await Beneficiario
      .createQueryBuilder()
      .update(Beneficiario)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Beneficiário não encontrado!' });
  }
}
