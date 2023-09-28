import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cidade } from "./Cidade";
import { CD_Item } from "./CD_Item";

@Entity('cd')
export class CD extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public nome: string;

   @ManyToOne(() => Cidade, (cidade) => cidade.cds)
   public cidade: Cidade;

   @Column({ type: "char", default: 'A' })
   public situacao: string;

   @OneToMany(() => CD_Item, (cd_item) => cd_item.cd)
   public cd_item: CD_Item[];
}
