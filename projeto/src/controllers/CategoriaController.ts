import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";

export class CategoriaController {
  async criar (nome: string) {
    let categoria: Categoria = new Categoria();
    categoria.nome = nome;
    await categoria.save();
  }

  async listar () {
    const categoriaRepository = Categoria;
    return await categoriaRepository
      .createQueryBuilder('categoria')
      .where('categoria.situacao != :situacao', { situacao: 'I' })
      .getMany();
  }

  async editar (categoria: Categoria, nome: string, situacao: string): Promise<Categoria> {
    categoria.nome = nome;
    categoria.situacao = situacao;
    await categoria.save();
    return categoria;
  }

  async buscar (id: number) {
    let categoria: Categoria | null = await Categoria.findOneBy({ id: id });
    return categoria;
  }

  async deletar(id: number) {
    let result = await Categoria
      .createQueryBuilder()
      .update(Categoria)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
