import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Beneficiario } from "./Beneficiario";
import { Item } from "./Item";

@Entity('movimentacao')
export class Movimentacao extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column({
    type: 'timestamp',
    default: 'NOW()'
   })
   public data: Date;

   @Column()
   public tipo: string;

   @Column()
   public quantidade: number;

   @Column({nullable: true})
   public doador: string;

   @Column({type: "char", default: 'A'})
   public situacao: string;

   @ManyToOne(() => Beneficiario, (beneficiario) => beneficiario.movimentacoes)
   public beneficiario: Beneficiario;

   @OneToMany(() => Item, (item) => item.movimentacao)
   public itens: Item[];
}
