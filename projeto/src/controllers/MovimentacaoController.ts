import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
import { Cidade } from "../models/Cidade";
import { Movimentacao } from "../models/Movimentacao";
import { Beneficiario } from "../models/Beneficiario";

export class MovimentacaoController {

  async criar (tipo: string, qtd: number, doador: string, idBeneficiario: number, itens: Item[]) {
    let movimentacao: Movimentacao = new Movimentacao();

    movimentacao.tipo = tipo;
    movimentacao.quantidade = qtd;
    movimentacao.doador = doador;
    let beneficiario = await Beneficiario.findOneBy({ id: idBeneficiario });
    if (beneficiario) {
      movimentacao.beneficiario = beneficiario;
    }
    movimentacao.itens = itens;
    await movimentacao.save();
  }

  async listar () {
    let movimentacoes: Movimentacao[] = await Movimentacao.find();
    return movimentacoes;
  }

  async editar (id: number, tipo: string, qtd: number, doador: string, idBeneficiario: number, itens: Item[]) {
    let movimentacao: Movimentacao = new Movimentacao();

    movimentacao.tipo = tipo;
    movimentacao.quantidade = qtd;
    movimentacao.doador = doador;
    let beneficiario = await Beneficiario.findOneBy({ id: idBeneficiario });
    if (beneficiario) {
      movimentacao.beneficiario = beneficiario;
    }
    movimentacao.itens = itens;
    await movimentacao.save();
  }

  async buscar (id: number) {
    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({ id: id });
    return movimentacao;
  }

  async deletar(id: number) {
    let result = await Movimentacao
      .createQueryBuilder()
      .update(Movimentacao)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
