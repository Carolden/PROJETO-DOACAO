import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Beneficiario } from "./Beneficiario";
import { CD_Item } from "./CD_Item";

@Entity('movimentacao')
export class Movimentacao extends BaseEntity {
   @PrimaryGeneratedColumn()
   public id: number;

   @Column({
    type: 'timestamp',
    default: 'NOW()'
   })
   public data: Date;

   @Column({ type: 'char' })
   public tipo: string;

   @Column()
   public quantidade: number;

   @Column({nullable: true})
   public doador: string;

   @Column({type: "char", default: 'A'})
   public situacao: string;

   @ManyToOne(() => Beneficiario, (beneficiario) => beneficiario.movimentacoes, {nullable: true})
   public beneficiario: Beneficiario;

   @ManyToOne(() => CD_Item, (cd_item) => cd_item.movimentacoes)
   public cd_item: CD_Item;
}
