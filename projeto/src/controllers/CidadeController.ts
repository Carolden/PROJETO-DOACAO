import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
import { Cidade } from "../models/Cidade";

export class CidadeController {

  async criar (nome: string): Promise<Cidade> {
    return await Cidade.create({
      nome,
    }).save();
  }

  async listar(): Promise<Cidade[]> {
    const cidadeRepository = Cidade;
    return await cidadeRepository
      .createQueryBuilder('cidade')
      .where('cidade.situacao != :situacao', { situacao: 'I' })
      .getMany();
  }

  async editar (id: number, nome: string): Promise<Cidade | null> {
    let cidade: Cidade | null = await Cidade.findOneBy({ id: id });
    if (cidade) {
      cidade.nome = nome;
      await cidade.save();
    }
    return cidade;
  }

  async buscar (id: number) {
    let cidade: Cidade | null = await Cidade.findOneBy({ id: id });
    return cidade;
  }

  async deletar(id: number) {
    let result = await Cidade
      .createQueryBuilder()
      .update(Cidade)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
