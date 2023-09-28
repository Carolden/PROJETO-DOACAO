import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Categoria } from "./Categoria";
import { CD_Item } from "./CD_Item";
import { Movimentacao } from "./Movimentacao";

@Entity('item')
export class Item extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public nome: string;

   @Column({type: "char", default: 'A'})
   public situacao: string;

   @ManyToOne(() => Categoria, (categoria) => categoria.itens)
   public categoria: Categoria;

   @OneToMany(() => CD_Item, (cd_item) => cd_item.item)
   public cd_item: CD_Item[];
}
