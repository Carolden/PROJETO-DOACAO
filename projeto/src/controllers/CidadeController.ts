import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
import { Cidade } from "../models/Cidade";

export class CidadeController {

  async criar (nome: string) {
    let cidade: Cidade = new Cidade();

    cidade.nome = nome;
    await cidade.save();
  }

  async listar () {
    let cidade: Cidade[] = await Cidade.find();
    return cidade;
  }

  async editar (id: number, nome: string) {
    let cidade: Cidade | null = await Cidade.findOneBy({ id: id });
    if (cidade) {
      cidade.nome = nome;
      cidade.save();
    }
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
