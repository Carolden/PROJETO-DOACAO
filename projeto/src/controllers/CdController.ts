import { Beneficiario } from "../models/Beneficiario";
import { CD } from "../models/CD";
import { Cidade } from "../models/Cidade";

export class CdController {

  async criar (nome: string): Promise<CD> {
    return await CD.create({
      nome,
    }).save();
  }

  /*
  async listar () {
    let itens: CD[] = await CD.find({
      relations: {
        cidade: true,
      }
    });
    return itens;
  }
  */
  async listar(): Promise<CD[]> {
    const CdRepository = CD;
    return await CdRepository
      .createQueryBuilder('cd')
      .where('cd.situacao != :situacao', { situacao: 'I' })
      .getMany();
  }

  async editar (cd: CD, nome: string, situacao: string): Promise<CD> {
    cd.nome = nome;
    cd.situacao = situacao;
    await cd.save();

    return cd;
  }

  async buscar (id: number) {
    let cd: CD | null = await CD.findOneBy({ id: id });
    return cd;
  }

  async deletar(id: number) {
    let result = await CD
      .createQueryBuilder()
      .update(CD)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
