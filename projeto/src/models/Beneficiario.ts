import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cidade } from "./Cidade";
import { Movimentacao } from "./Movimentacao";

@Entity('beneficiario')
export class Beneficiario extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column()
   public nome: string;

   @ManyToOne(() => Cidade, (cidade) => cidade.beneficiarios)
   public cidade: Cidade;

   @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.beneficiario)
   public movimentacoes: Movimentacao[];

   @Column({ type: "char", default: 'A' })
   public situacao: string;
}
