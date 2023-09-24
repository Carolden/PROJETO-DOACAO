import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";

@Entity('categoria')
export class Categoria extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public nome: string;

   @OneToMany(() => Item, (item) => item.categoria)
   public itens: Item[];

   @Column({type: "char", default: 'A'})
   public situacao: string;
}
