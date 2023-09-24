import { Beneficiario } from "../models/Beneficiario";
import { Cidade } from "../models/Cidade";

export class BeneficiarioController {

  async criar (nome: string, idCidade: number) {
    let beneficiario: Beneficiario = new Beneficiario();

    beneficiario.nome = nome;
    let cidade: Cidade | null = await Cidade.findOneBy({id:idCidade});
    if (cidade) {
      beneficiario.cidade = cidade;
    }
    await beneficiario.save();
  }

  async listar () {
    let itens: Beneficiario[] = await Beneficiario.find({
      relations: {
        cidade: true,
      }
    });
    return itens;
  }

  async editar (id: number, nome: string, idCidade: number) {
    let beneficiario: Beneficiario | null = await Beneficiario.findOneBy({ id: id });
    if (beneficiario) {
      beneficiario.nome = nome;
      let cidade: Cidade | null = await Cidade.findOneBy({ id: idCidade });
      if (cidade) {
        beneficiario.cidade = cidade;
      }
      beneficiario.save();
    }
  }

  async buscar (id: number) {
    let beneficiario: Beneficiario | null = await Beneficiario.findOneBy({ id: id });
    return beneficiario;
  }

  async deletar(id: number) {
    let result = await Beneficiario
      .createQueryBuilder()
      .update(Beneficiario)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
