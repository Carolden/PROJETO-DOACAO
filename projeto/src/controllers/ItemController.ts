import { Item } from "../models/Item";
import { Categoria } from "../models/Categoria";
import { CD } from "../models/CD";
import { CategoriaController } from "./CategoriaController";

let categoriaController: CategoriaController = new CategoriaController();



export class ItemController {

  async criar (nome: string, idCategoria: number) {
    let item: Item = new Item();

    item.nome = nome;
    let cat: Categoria | null = await Categoria.findOneBy({id:idCategoria});
    if (cat) {
      item.categoria = cat;
    }
    return await Item.create({
      nome: nome,
      categoria_id: idCategoria,
    }).save();
  } 


  /*
  async listar () {
    let itens: Item[] = await Item.find({
      relations: {
        categoria: true,
      }
    });
    return itens;
  }
  */

  async listar(): Promise<Item[]> {
    const itemRepository = Item;
    return await itemRepository
      .createQueryBuilder('item')
      .where('item.situacao != :situacao', { situacao: 'I' })
      .getMany();
  }



  async editar (id: number, itemAtualizado: Item) {
    let item: Item | null = await Item.findOneBy({ id: id });
    if (item) {
      item = itemAtualizado;
      item.save();
    }
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
