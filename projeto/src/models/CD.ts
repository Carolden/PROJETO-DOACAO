import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cidade } from "./Cidade";

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
}
