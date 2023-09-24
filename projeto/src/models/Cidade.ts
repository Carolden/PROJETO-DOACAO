import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CD } from "./CD";
import { Beneficiario } from "./Beneficiario";

@Entity('cidade')
export class Cidade extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public nome: string;

   @OneToMany(() => CD, (cd) => cd.cidade)
   public cds: CD[];

   @OneToMany(() => Beneficiario, (beneficiario) => beneficiario.cidade)
   public beneficiarios: Beneficiario[];

   @Column({ type: "char", default: 'A' })
   public situacao: string;
}
