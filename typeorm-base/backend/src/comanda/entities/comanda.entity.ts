import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cafeteria } from "../../cafeteria/entities/cafeteria.entity";

@Entity({ name: "COMANDA" })
export class Comanda {
  @PrimaryGeneratedColumn({ name: "ID" })
  id!: number;

  @Column({ name: "NOMBRE", type: "varchar", length: 120 })
  nombre!: string;

  @Column({ name: "IMPORTE_CENTIMOS", type: "integer" })
  importeCentimos!: number;

  @ManyToOne(() => Cafeteria, (cafeteria) => cafeteria.comandas, { nullable: false })

  @JoinColumn({ name: "ID_CAFETERIA" })

  cafeteria!: Cafeteria;
}