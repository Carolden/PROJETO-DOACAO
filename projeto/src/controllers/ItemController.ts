import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
import { CD } from "../models/CD";
import { CategoriaController } from "./CategoriaController";
import { Movimentacao } from "../models/Movimentacao";

let categoriaController: CategoriaController = new CategoriaController();



export class ItemController {


  async criar (nome: string, idCategoria: number) {
    let item: Item = new Item();

    item.nome = nome;
    let cat: Categoria | null = await Categoria.findOneBy({id:idCategoria});
    if (cat) {
      item.categoria = cat;
    }
    await item.save();
  }


  async listar () {
    let itens: Item[] = await Item.find({
      relations: {
        categoria: true,
      }
    });
    return itens;
  }


  async editar (item: Item, nome: string, situacao: string, idCategoria: string): Promise<Item> {
    item.nome = nome;
    item.situacao = situacao;
    let id: number;
    if (idCategoria != '') {
      id = Number(idCategoria);
      let cat: Categoria | null = await Categoria.findOneBy({id:id});
      if (cat) {
        item.categoria = cat;
      }
    }
    item.situacao = situacao;
    await item.save();

    return item;
  }

  async buscar (id: number) {
    let item: Item | null = await Item.findOneBy({ id: id });
    return item;
  }

  async deletar(id: number) {
    let result = await Item
      .createQueryBuilder()
      .update(Item)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }
}
