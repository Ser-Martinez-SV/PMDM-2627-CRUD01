import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cafeteria } from "../cafeteria/entities/cafeteria.entity";
import { Comanda } from "./entities/comanda.entity";
import { ComandaController } from "./comanda.controller";
import { ComandaService } from "./comanda.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cafeteria, Comanda])],
  controllers: [ComandaController],
  providers: [ComandaService],
})
export class ComandaModule {}