import { Pipe, PipeTransform } from "@angular/core";
import { SocioModel } from "src/app/_models/socio.model";

@Pipe({
  name: "buscaGrau",
})
export class BuscaGrauPipe implements PipeTransform {
  transform(listItems: any[], grau: string) {
    if (grau) {
      return listItems.filter((item: any) => item.grau[0].nome.includes(grau));
    } else {
      return listItems;
    }
  }
}
