import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { CD } from "./CD";
import { Movimentacao } from "./Movimentacao";

@Entity('cd_item')
export class CD_Item extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @ManyToOne(() => CD, (cd) => cd.cd_item)
   public cd: CD;

   @ManyToOne(() => Item, (item) => item.cd_item)
   public item: Item;

   @Column()
   public itemId: number;

   @Column()
   public cdId: number;

   @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.cd_item)
   public movimentacoes: Movimentacao[];

   @Column()
   public quantidade: number;
}
