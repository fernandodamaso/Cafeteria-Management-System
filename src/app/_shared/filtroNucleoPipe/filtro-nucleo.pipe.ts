import { Pipe, PipeTransform } from "@angular/core";
import { nucleoModel } from "src/app/_models/nucleo.model";
import { SocioModel } from "src/app/_models/socio.model";

@Pipe({
  name: "buscaNucleo",
})
export class buscaNucleoPipe implements PipeTransform {
  transform(listItems: SocioModel[], nucleo: string) {
    if (nucleo) {
      return listItems.filter((item: SocioModel) => item.nucleo.nome.includes(nucleo));
    } else {
      return listItems;
    }
  }
}
