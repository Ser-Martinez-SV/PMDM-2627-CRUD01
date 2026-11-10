import { Controller, Delete, Get, Param, Patch, Put, Query } from "@nestjs/common";
import { ComandaService } from "./comanda.service";

@Controller("comandas")
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

  @Get()
  findAll() {
    return this.comandaService.findAll();
  }

  @Get("cafeteria/:principalId")
  findByCafeteria(@Param("principalId") principalId: string) {
    return this.comandaService.findByCafeteria(Number(principalId));
  }

  @Get("buscar")
  searchByName(@Query("texto") text: string) {
    return this.comandaService.searchByName(text);
  }

  @Get("cafeteria/:principalId/minimo/:minimum")
  findByCafeteriaAndMinimum(
    @Param("principalId") principalId: string,
    @Param("minimum") minimum: string,
  ) {
    return this.comandaService.findByCafeteriaAndMinimum(Number(principalId), Number(minimum));
  }

  @Get("resumen/cafeteria")
  countByCafeteria() {
    return this.comandaService.countByCafeteria();
  }


  //Creamos un put que permita añadir cafeterias y que despues de añadirla la devuelva para verla.
  @Put("cafeteria/create/:principalId/:nombre")
  addCafeteria(@Param("principalId") principalId: string, @Param("nombre") nombre: string) {
    return this.comandaService.addCafeteria(Number(principalId), nombre);
  }

  //Creamos un delete para eliminar cafeterias
  @Delete("cafeteria/delete/:principalId")
  deleteCafeteria(@Param("principalId") principalId: string) {
    return this.comandaService.deleteCafeteria(Number(principalId));
  }

  //Ahora añadimos una para modificar un solo campo de cafeteria
  @Patch("cafeteria/update/:principalId/:newnombre")
  updateCafeteria(@Param("principalId") principalId: string, @Param("newnombre") newnombre: string) {
    return this.comandaService.updateCafeteria(Number(principalId), newnombre);
  }


  //Get de solo las cafeterias
  @Get("cafeterias")
  getCafeterias() {
    return this.comandaService.getCafeterias();
  }


  //Modificamos con un patch a donde pertenece una comanda, es decir, cambiar la cafeteria de una comanda, con pathparam
  @Patch("comanda/:comandaId/cafeteria/:newCafeteriaId")
  updateComandaCafeteria(@Param("comandaId") comandaId: string, @Param("newCafeteriaId") newCafeteriaId: string) {
    return this.comandaService.updateComandaCafeteria(Number(comandaId), Number(newCafeteriaId));
  }


  @Get("cafeteria/masde/:num")
  findByCafeteriaMoreThan(
    @Param("num") num: string,
  ) {
    return this.comandaService.findByCafeteriaMoreThan(Number(num));
  }
}