import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Categoria } from "./Categoria";
import { CD } from "./CD";
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

   @ManyToOne(() => Movimentacao, (movimentacao) => movimentacao.itens)
   public movimentacao: Movimentacao;

   @ManyToMany(() => CD)
   @JoinTable()
   public cd: CD[]
}
