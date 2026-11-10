import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createQueryBuilder, Repository } from "typeorm";
import { Cafeteria } from "../cafeteria/entities/cafeteria.entity";
import { Comanda } from "./entities/comanda.entity";

@Injectable()
export class ComandaService {
  constructor(
    @InjectRepository(Comanda)
    private readonly comandaRepository: Repository<Comanda>,
    @InjectRepository(Cafeteria)
    private readonly cafeteriaRepository: Repository<Cafeteria>,
  ) {}

  findAll() {
    return this.comandaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.cafeteria", "principal")
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  findByCafeteria(principalId: number) {
    return this.comandaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.cafeteria", "principal")
      .where("principal.id = :principalId", { principalId })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  searchByName(text: string) {
    return this.comandaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.cafeteria", "principal")
      .where("registro.nombre ILIKE :pattern", { pattern: `%${text}%` })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  findByCafeteriaAndMinimum(principalId: number, minimum: number) {
    return this.comandaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.cafeteria", "principal")
      .where("principal.id = :principalId", { principalId })
      .andWhere("registro.importeCentimos >= :minimum", { minimum })
      .orderBy("registro.importeCentimos", "DESC")
      .getMany();
  }

  countByCafeteria() {
    return this.cafeteriaRepository
      .createQueryBuilder("principal")
      .leftJoin("principal.comandas", "registro")
      .select("principal.id", "id")
      .addSelect("principal.nombre", "nombre")
      .addSelect("COUNT(registro.id)", "total")
      .groupBy("principal.id")
      .addGroupBy("principal.nombre")
      .orderBy("principal.id", "ASC")
      .getRawMany();
  }

  addCafeteria(principalId: number, nombre: string){
    return this.cafeteriaRepository
      .createQueryBuilder()
      .insert()
      .into(Cafeteria)
      .values({ id: principalId, nombre: nombre })
      .execute();
  }

  //Creamos una función para eliminar cafeterias por id
  deleteCafeteria(principalId: number){
    return this.cafeteriaRepository
      .createQueryBuilder()
      .delete()
      .from(Cafeteria)
      .where("id = :principalId", { principalId })
      .execute();
  }

  //Creamos una función para modificar el nombre
  updateCafeteria(principalId: number, newnombre: string){
    return this.cafeteriaRepository
      .createQueryBuilder()
      .update(Cafeteria)
      .set({ nombre: newnombre })
      .where("id = :principalId", { principalId })
      .execute();
  }

  //modificamos la cefeteria de una comanda
  updateComandaCafeteria(comandaId: number, newCafeteriaId: number){
    return this.comandaRepository
      .createQueryBuilder()
      .update(Comanda)
      .set({ cafeteria: { id: newCafeteriaId } })
      .where("id = :comandaId", { comandaId })
      .execute();
  }

  getCafeterias(){
    return this.cafeteriaRepository
      .createQueryBuilder("principal")
      .orderBy("principal.id", "ASC")
      .getMany();
  }

  findByCafeteriaMoreThan(num: number) {
    return this.comandaRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.cafeteria", "principal")
      .where("registro.importeCentimos > :num", { num })
      .orderBy("registro.importeCentimos", "DESC")
      .getMany();
  }
}